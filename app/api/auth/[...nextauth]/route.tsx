import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      url: string;
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

const prisma = new PrismaClient();

const authHandler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null; // or throw an error if you want to handle it differently
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });

          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password))
          ) {
            const { password, ...userDetails } = user;
            return { ...userDetails, id: user.id.toString() };
          }
          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/signin",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.url = user.url;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.url = token.url as string;
      }
      return session;
    },
  },
});

const authOption = NextAuth(authHandler);

export { authHandler as POST, authHandler as GET, authOption };
export default authHandler;
