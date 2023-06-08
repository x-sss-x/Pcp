import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const NextAuthOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId:
        "609375383923-vgccb484g52opt39vcqqdb48oa7ifael.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    Credentials({
      credentials: {
        userId: {
          label: "username or email",
          type: "email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      authorize: async (credentials, req) => {
        console.log(credentials);

        //if email or password is not present
        if (!credentials?.userId || !credentials.password) return null;

        const user = await prisma.user.findMany({
          where: {
            OR: [
              {
                email: credentials.userId,
              },
              {
                username: credentials.userId,
              },
            ],
          },
          select: {
            email: true,
            password: true,
            id: true,
          },
        });
        console.log();

        //if user is not found in the database
        if (!user || !user[0].password) return null;

        //decrypt password
        const isValidPassword = await compare(
          credentials.password,
          user[0].password
        );

        //if is not valid password
        if (!isValidPassword) return null;

        return user[0];
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    // newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // signIn(params) {
    //   if (params.user.id) return "/";
    //   else return "/sign-in";
    // }
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
