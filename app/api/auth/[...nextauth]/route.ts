// import NextAuth from 'next-auth';
// import authConfig from './options';

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
