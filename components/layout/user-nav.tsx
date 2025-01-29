'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';

export function UserNav() {
  const { data: session } = useSession();

  if (session) {
    const isAdmin = true;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={session.user?.image || ''}
                alt={session.user?.name || 'Admin'}
              />
              <AvatarFallback className="bg-[#084C61] text-white">
                {session.user?.name
                  ? session.user.name.slice(0, 2).toUpperCase()
                  : 'AD'}
              </AvatarFallback>
            </Avatar>
            {isAdmin && (
              <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-[#CBB098] ring-2 ring-white" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium leading-none">
                  {session.user?.name}
                </p>
                {isAdmin && (
                  <span className="rounded-md bg-[#084C61] px-1.5 py-0.5 text-xs text-white">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isAdmin && (
              <DropdownMenuItem>
                Admin Dashboard
                <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() =>
              signOut({ callbackUrl: `${window.location.origin}/` })
            }
            className="text-red-600 hover:bg-red-50"
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return null;
}
