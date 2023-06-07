import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export const NextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:
        "609375383923-vgccb484g52opt39vcqqdb48oa7ifael.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    // signIn: "/sign-in",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    // newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  session:{

  }
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
