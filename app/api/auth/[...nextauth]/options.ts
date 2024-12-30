// // import NextAuth from 'next-auth';
// // import CredentialsProvider from 'next-auth/providers/credentials';
// // import bcrypt from 'bcryptjs';
// // import prisma from '@/lib/prisma';

// // const authOptions = NextAuth({
// //   providers: [
// //     CredentialsProvider({
// //       id: 'credentials',
// //       name: 'Credentials',
// //       credentials: {
// //         username: { label: 'Username', type: 'text' },
// //         password: { label: 'Password', type: 'password' }
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.username || !credentials?.password) {
// //           throw new Error('Please provide both username and password');
// //         }

// //         const user = await prisma.user.findUnique({
// //           where: { email: credentials.username as string }
// //         });
        

// //         if (!user) {
// //           throw new Error('No user found with this email');
// //         }

// //         if (!user.isVerified) {
// //           throw new Error('Please verify your email first');
// //         }

// //         const isValid = await bcrypt.compare(
// //           credentials.password as string,
// //           user.password
// //         );

// //         if (!isValid) {
// //           throw new Error('Invalid password');
// //         }

// //         return {
// //           ...user,
// //           id: user.id.toString()
// //         };
// //       }
// //     })
// //   ],
// //   callbacks: {
// //     async jwt({ token, user }) {
// //       if (user) {
// //         token.id = user.id;
// //         token.email = user.email;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       if (token) {
// //         session.user = {
// //           ...session.user,
// //           id: token.id as string,
// //           email: token.email || ''
// //         };
// //       }
// //       return session;
// //     }
// //   },
// //   session: {
// //     strategy: 'jwt'
// //   },
// //   pages: {
// //     signIn: '/auth/signin',
// //     error: '/auth/error'
// //   },
// //   secret: process.env.NEXTAUTH_SECRET
// // });

// // export default authOptions;

// import type { DefaultSession, NextAuthConfig } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import bcrypt from 'bcryptjs';
// import prisma from '@/lib/prisma';
// import { JWT } from 'next-auth/jwt';
// import { Session } from 'next-auth';

// declare module 'next-auth' {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       email: string;
//       isVerified: boolean;
//     } & DefaultSession['user'];
//   }
// }

// const authConfig: NextAuthConfig = {
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text' },
//         password: { label: 'Password', type: 'password' }
//       },
//       async authorize(credentials) {
//         if (!credentials?.username || !credentials?.password) {
//           throw new Error('Please provide both username and password');
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.username as string }
//         });

//         if (!user) {
//           throw new Error('No user found with this email');
//         }

//         if (!user.isVerified) {
//           throw new Error('Please verify your email first');
//         }

//         const isValid = await bcrypt.compare(
//           credentials.password as string,
//           user.password
//         );

//         if (!isValid) {
//           throw new Error('Invalid password');
//         }

//         return {
//           id: user.id.toString(),
//           email: user.email,
//           isVerified: user.isVerified
//         };
//       }
//     })
//   ],
//   callbacks: {
//     async jwt({ token, user }: { token: JWT; user: any }) {
//       if (user) {
//         token.id = user.id;
//         token.email = user.email;
//         token.isVerified = user.isVerified;
//       }
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.email = token.email;
//         session.user.isVerified = token.isVerified;
//       }
//       return session;
//     }
//   },
//   pages: {
//     signIn: '/auth/signin'
//   },
//   session: { strategy: 'jwt' },
//   secret: process.env.NEXTAUTH_SECRET
// };

// export default authConfig;