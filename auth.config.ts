import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

const prisma = new PrismaClient();

const authConfig: NextAuthConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        // Find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });
        if (!user) {
          throw new Error('Invalid credentials');
        }

       
        const isValid = bcrypt.compareSync(
          credentials.password as string,
          user.password
        );
        if (!isValid) {
          throw new Error('Invalid credentials');
        }
        return {
          id: String(user.id),
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  pages: {
    signIn: '/' 
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          email: token.email as string
        };
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authConfig;
