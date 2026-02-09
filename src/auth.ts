// src/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import { setGlobalDispatcher, ProxyAgent } from "undici";

// 1. 开发环境网络代理
if (process.env.NODE_ENV === "development") {
  const dispatcher = new ProxyAgent("http://127.0.0.1:7890"); // 替换为你的 VPN 端口
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
      if (account?.provider === "google") {
        try {
          const email = user.email;
          if (!email) return false;

          // 先查找是否存在该邮箱的用户
          const existingUser = await prisma.user.findUnique({
            where: { email: email }
          });

          if (existingUser) {
            // 如果用户存在，更新信息
            await prisma.user.update({
              where: { email: email },
              data: {
                accessToken: account.access_token,
                picture: user.image,
                name: user.name,
                type: CURRENT_SITE_TYPE, // 更新站点类型
              }
            });
          } else {
            // 如果用户不存在，创建新用户
            await prisma.user.create({
              data: {
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
              }
            });
          }

          return true;
        } catch (error) {
          console.error("Auth_SignIn_Database_Error:", error);
          return false;
        }
      }
      return true;
    },

    // 💡 JWT 回调：从数据库取出 UUID 放入 Token
    async jwt({ token, user, account, trigger }) {
      // 在登录时、手动更新时，或者每次都查询数据库以确保积分是最新的
      if ((user && account) || trigger === "update" || token.email) {
        if (token.email) {
          try {
            const dbUser: any = await prisma.user.findUnique({
              where: { email: token.email }
            });

            // 检查用户是否属于当前站点类型
            if (dbUser && dbUser.type === CURRENT_SITE_TYPE) {
              token.dbId = dbUser.id; // 数字 ID (464)
              token.googleUserId = dbUser.googleUserId;
              token.credits = dbUser.credits;
              token.siteType = dbUser.type;

              // 添加调试日志
              console.log('JWT callback - Updated token credits:', {
                email: token.email,
                credits: dbUser.credits,
                trigger
              });
            }
          } catch (error) {
            console.error('JWT callback database error:', error);
          }
        }
      }
      return token;
    },

    async session({ session, token }: any) {
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