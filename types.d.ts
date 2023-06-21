import { Role } from "@prisma/client";
import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      role: Role;
      username:string;
      address:string;
      bio:string;
    };
  }
}

declare module "next-auth/jwt/types" {
  interface JWT {
    uid: string;
    role: Role;
    username:string;
    address:string;
    bio:string;
  }
}
