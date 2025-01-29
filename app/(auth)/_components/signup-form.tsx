// 'use client';

// import * as React from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Icons } from '@/components/icons';
// import { cn } from '@/lib/utils';
// import { useRouter } from 'next/navigation';

// interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}

// export default function SignUpForm({ className, ...props }: SignUpFormProps) {
//   const [isLoading, setIsLoading] = React.useState<boolean>(false);
//   const router = useRouter();

//   async function onSubmit(event: React.SyntheticEvent) {
//     event.preventDefault();
//     setIsLoading(true);

//     setTimeout(() => {
//       setIsLoading(false);
//       router.push('/');
//     }, 3000);
//   }

//   return (
//     <div className={cn('grid gap-6', className)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-4">
//           <div className="grid gap-2">
//             <Label className="text-[#B8C4C9]" htmlFor="name">
//               Role
//             </Label>
//             <Input
//               id="role"
//               placeholder="admin"
//               type="text"
//               autoCapitalize="none"
//               autoComplete="name"
//               autoCorrect="off"
//               disabled={isLoading}
//               className="border-[#4F6D7A]/20 bg-white/5 text-white"
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label className="text-[#B8C4C9]" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//               className="border-[#4F6D7A]/20 bg-white/5 text-white"
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label className="text-[#B8C4C9]" htmlFor="password">
//               Password
//             </Label>
//             <Input
//               id="password"
//               placeholder="********"
//               type="password"
//               autoCapitalize="none"
//               autoComplete="new-password"
//               disabled={isLoading}
//               className="border-[#4F6D7A]/20 bg-white/5 text-white"
//             />
//           </div>

//           <Button
//             className="bg-[#4F6D7A] text-white hover:bg-[#4F6D7A]/90"
//             disabled={isLoading}
//           >
//             {isLoading && (
//               <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//             )}
//             Create Account
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }
'use client';
import * as z from 'zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';

interface SignUpFormProps extends React.HTMLAttributes<HTMLDivElement> {}
const formSchema = z.object({
  role: z.string().min(1, 'Role is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export default function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: '',
      email: '',
      password: ''
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });

      if (!response.ok) throw new Error();

      toast.success('Account created successfully');
      router.push('/');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="admin"
                    disabled={isLoading}
                    className="border-[#4F6D7A]/20 bg-white/5 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@example.com"
                    disabled={isLoading}
                    className="border-[#4F6D7A]/20 bg-white/5 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="****"
                    disabled={isLoading}
                    className="border-[#4F6D7A]/20 bg-white/5 text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#4F6D7A] text-white hover:bg-[#4F6D7A]/90"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Create Account
          </Button>
        </form>
      </Form>
    </div>
  );
}
