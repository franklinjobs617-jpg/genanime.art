import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: number;
      googleUserId?: string;
      credits?: number;
      siteType?: string;
    };
  }

  interface User {
    id?: number;
    googleUserId?: string;
    credits?: number;
    siteType?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    dbId?: number;
    googleUserId?: string;
    credits?: number;
    siteType?: string;
  }
}