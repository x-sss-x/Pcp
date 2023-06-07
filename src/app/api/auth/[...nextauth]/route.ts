import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsContainer from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "609375383923-vgccb484g52opt39vcqqdb48oa7ifael.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    CredentialsContainer({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
          if(credentials?.username == "manu1234" && credentials.password == "1234"){
            return {
              username:"manu",
              id:"12345678",
              email:"manu48617@gmail.com"
            }
          }
          return null
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
    pages: {
      signIn: '/sign-in',
      signOut: '/sign-out',
      // error: '/error', // Error code passed in query string as ?error=
      verifyRequest: '/verify-request', // (used for check email message)
      newUser: '/sign-up' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks:{
      signIn(params) {
          return "/"
      },
    }
});

export { handler as GET, handler as POST };
