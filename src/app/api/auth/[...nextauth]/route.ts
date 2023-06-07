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
      credentials:{
        email:{
          label:"email",
          type:"email"
        },
        password:{
          label:"password",
          type:"password"
        }
      },
      authorize:async (credentials,req)=>{
        console.log(credentials)

        //if email or password is not present 
        if(!credentials?.email || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where:{
            email:credentials.email
          }
        })
        
        //if user is not found in the database
        if(!user || !user.password) return null

        //decrypt password
        const isValidPassword = await compare(credentials.password,user.password);
        
        //if is not valid password
        if(!isValidPassword) return null

        return {
          id:user.id,
          email:user.email,
          image:user.image,
          name:user.name,
          username:user.username
        };
      }
    })
  ],
  pages: {
    // signIn: "/sign-in",
    // signOut: "/sign-out",
    // error: '/error', // Error code passed in query string as ?error=
    verifyRequest: "/verify-request", // (used for check email message)
    // newUser: "/sign-up", // New users will be directed here on first sign in (leave the property out if not of interest)
  }
};

const handler = NextAuth(NextAuthOptions);

export { handler as GET, handler as POST };
