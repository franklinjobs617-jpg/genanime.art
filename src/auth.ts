// src/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
// 暂时注释掉代理相关导入
import { setGlobalDispatcher, ProxyAgent } from "undici";

if (process.env.NODE_ENV === "development" && process.env.USE_PROXY === "true") {
    const dispatcher = new ProxyAgent("http://127.0.0.1:7890");
    setGlobalDispatcher(dispatcher);
}

// 将站点类型固定为 4
const CURRENT_SITE_TYPE = "4";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  secret: process.env.AUTH_SECRET,
  trustHost: true,

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("=== SignIn Callback Start ===");
      console.log("User:", user?.email);
      console.log("Provider:", account?.provider);
      console.log("Profile:", profile);

      if (account?.provider === "google") {
        try {
          const email = user.email;
          if (!email) {
            console.error("❌ No email provided");
            return false;
          }

          console.log("✅ Email found:", email);
          console.log("🔄 Attempting database connection...");

          // 测试数据库连接
          await prisma.$connect();
          console.log("✅ Database connected successfully");

          console.log("🔄 Attempting database upsert...");

          // 使用 upsert 原子操作
          const result = await prisma.user.upsert({
            where: {
              email_type: {
                email: email,
                type: CURRENT_SITE_TYPE
              }
            },
            update: {
              accessToken: account.access_token,
              picture: user.image,
              name: user.name,
            },
            create: {
              email: email,
              type: CURRENT_SITE_TYPE,
              googleUserId: crypto.randomUUID(),
              name: user.name,
              givenName: (profile as any)?.given_name,
              familyName: (profile as any)?.family_name,
              picture: user.image,
              accessToken: account.access_token,
              credits: "5",
              ip: "0.0.0.0"
            },
          });

          console.log("✅ Database upsert successful:", result.id);
          console.log("=== SignIn Callback Success ===");
          return true;
        } catch (error) {
          console.error("❌ Auth_SignIn_Database_Error:", error);
          console.error("Error details:", {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : 'No stack trace'
          });
          console.log("=== SignIn Callback Failed ===");
          return false;
        }
      }

      console.log("✅ Non-Google provider, allowing sign in");
      return true;
    },

    // 💡 JWT 回调：从数据库取出 UUID 放入 Token
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { email: token.email, hasUser: !!user });

      if (token.email) {
        try {
          const dbUser: any = await prisma.user.findUnique({
            where: {
              email_type: {
                email: token.email,
                type: CURRENT_SITE_TYPE
              }
            }
          });

          if (dbUser) {
            console.log("Found user in DB:", { id: dbUser.id, credits: dbUser.credits });
            token.dbId = dbUser.id; // 数字 ID (464)
            token.googleUserId = dbUser.googleUserId;
            token.credits = dbUser.credits;
            token.siteType = dbUser.type;
          } else {
            console.log("No user found in DB for:", token.email);
          }
        } catch (error) {
          console.error("JWT callback error:", error);
        }
      }
      return token;
    },

    async session({ session, token }: any) {
      console.log("Session callback:", {
        hasToken: !!token,
        hasUser: !!session.user,
        tokenCredits: token?.credits
      });

      if (token && session.user) {
        session.user.id = token.dbId;
        session.user.googleUserId = token.googleUserId;
        session.user.credits = token.credits;
        session.user.siteType = token.siteType;
      }
      return session;
    }
  },
})