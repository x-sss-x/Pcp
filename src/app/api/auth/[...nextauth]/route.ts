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
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
      type: "credentials",
      authorize: async (credentials, req) => {
        //if email or password is not present
        if (!credentials?.userId || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.userId,
          },
        });

        //if user is not found in the database
        if (!user || !user.password) return null;

        //decrypt password
        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        //if is not valid password
        if (!isValidPassword) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
        const user = await prisma.user.findUnique({ where: { id: token.uid } });
        if (user?.role) session.user.role = user.role;
        if (user?.username) session.user.username = user.username;
        if (user?.bio) session.user.bio = user.bio;
        if (user?.address) session.user.address = user.address;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
        const userRes = await prisma.user.findUnique({
          where: { id: user.id },
        });
        if (userRes?.role) token.role = userRes.role;
        if (userRes?.username) token.username = userRes.username;
        if (userRes?.bio) token.bio = userRes.bio;
        if (userRes?.address) token.username = userRes.address;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
