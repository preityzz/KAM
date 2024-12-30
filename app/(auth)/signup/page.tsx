// 'use client';

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle
// } from '@/components/ui/card';
// import UserAuthForm from '../_components/user-auth-form';
// import Link from 'next/link';
// import { buttonVariants } from '@/components/ui/button';
// import { cn } from '@/lib/utils';

// export default function SignUpPage() {
//   return (
//     <div className="container flex h-screen w-screen flex-col items-center justify-center">
//       <Link
//         href="/signin"
//         className={cn(
//           buttonVariants({ variant: 'ghost' }),
//           'absolute right-4 top-4 md:right-8 md:top-8'
//         )}
//       >
//         Login
//       </Link>
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//         <Card>
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl font-semibold tracking-tight">
//               Create an account
//             </CardTitle>
//             <CardDescription>
//               Enter your email and password to create your account
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="p-6">
//             <UserAuthForm />
//           </CardContent>
//           <CardFooter className="flex flex-col gap-4">
//             <div className="text-center text-sm text-muted-foreground">
//               Already have an account?{' '}
//               <Link href="/signin" className="text-primary hover:underline">
//                 Sign in
//               </Link>
//             </div>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// }
