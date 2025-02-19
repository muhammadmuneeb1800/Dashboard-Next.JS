import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (user) {
            const isPasswordValid = await bcrypt.compare(
              credentials?.password as string,
              user.password as string
            );
            if (isPasswordValid) {
              return user;
            } else {
              return null;
            }
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Error", error as Error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl + "/dashboard";
    },
  },
};

export default NextAuth(authOptions);
