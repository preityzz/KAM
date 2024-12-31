// 'use client';

// import { useParams } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Heading } from '@/components/ui/heading';
// import { Separator } from '@/components/ui/separator';
// import { Phone, Mail, UserCircle, Loader2 } from 'lucide-react';

// interface Contact {
//   id: number;
//   name: string;
//   role: string;
//   email: string | null;
//   phone: string;
//   restaurantId: number;
// }

// export default function POCsPage() {
//   const params = useParams();
//   const restaurantId = params.restaurantId;

//   const { data: contacts, isLoading } = useQuery<Contact[]>({
//     queryKey: ['contacts', restaurantId],
//     queryFn: async () => {
//       const response = await fetch(`/api/contacts/${restaurantId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch contacts');
//       }
//       return response.json();
//     }
//   });

//   if (isLoading) {
//     return (
//       <div className="flex h-full items-center justify-center">
//         <Loader2 className="h-6 w-6 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 space-y-4 p-8 pt-6">
//       <div className="flex items-center justify-between">
//         <Heading
//           title="Point of Contacts"
//           description="View all POCs for this restaurant"
//         />
//       </div>
//       <Separator />
//       {contacts?.length === 0 ? (
//         <div className="flex h-[450px] items-center justify-center rounded-md border border-dashed">
//           <p className="text-muted-foreground">No contacts found</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {contacts?.map((contact: Contact) => (
//             <Card
//               key={contact.id}
//               className="transition-shadow hover:shadow-md"
//             >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-lg">
//                   <UserCircle className="h-6 w-4" />
//                   {contact.name}
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-3">
//                 <div className="flex items-center gap-2 text-muted-foreground">
//                   <Mail className="h-4 w-4" />
//                   {contact.email || 'No email provided'}
//                 </div>
//                 <div className="flex items-center gap-2 text-muted-foreground">
//                   <Phone className="h-4 w-4" />
//                   {contact.phone}
//                 </div>
//                 <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
//                   {contact.role}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Phone, Mail, UserCircle, Loader2 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  role: string;
  email: string | null;
  phone: string;
  restaurantId: number;
}

export default function POCsPage() {
  const params = useParams();
  const restaurantId = params.restaurantId;

  const { data: contacts, isLoading } = useQuery<Contact[]>({
    queryKey: ['contacts', restaurantId],
    queryFn: async () => {
      const response = await fetch(`/api/contacts/${restaurantId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-primary">Point of Contacts</h1>
          <p className="text-lg text-gray-600">
            Manage and view all POCs for this restaurant
          </p>
        </div>
      </div>
      <Separator className="border-t-2 border-gray-300" />

      {contacts?.length === 0 ? (
        <div className="flex h-[450px] flex-col items-center justify-center space-y-4 bg-gray-50">
          <UserCircle className="h-16 w-16 text-gray-400" />
          <p className="text-xl font-bold text-gray-700">User not found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {contacts?.map((contact: Contact) => (
            <Card
              key={contact.id}
              className="rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
            >
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                  <UserCircle className="h-8 w-8 text-primary" />
                  {contact.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-600">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="text-base">
                    {contact.email || 'No email provided'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500" />
                  <span className="text-base">{contact.phone}</span>
                </div>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {contact.role}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
