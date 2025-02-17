import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          placeholder: "Enter your email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password as string
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, email: user.email };
      },
    }),
  ],
});

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import NextAuth from "next-auth";
// import { prisma } from "@/lib/prisma";
// import Credentials from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   providers: [
//     Credentials({
//       credentials: {
//         email: {
//           label: "Email",
//           placeholder: "Enter your email",
//           type: "email",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Email and password are required");
//         }

//         const user = await prisma.user.findFirst({
//           where: { email: credentials.email },
//         });

//         if (!user) {
//           throw new Error("User not found");
//         }

//         const isPasswordValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password as string
//         );

//         if (!isPasswordValid) {
//           throw new Error("password is not valid");
//         }

//         return { id: user.id, email: user.email };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async signIn({ user }) {
//       if (!user) return "/login?error=Invalid credentials";
//       return true;
//     },
//   },
// });
