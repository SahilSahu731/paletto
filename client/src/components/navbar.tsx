'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/mode-toggle';

export default function Navbar() {
  const { user, logout } = useAuthStore();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/60 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="w-8 h-8 rounded-full bg-linear-to-br from-primary to-secondary shadow-lg shadow-primary/25" />
          <span className="font-bold text-xl tracking-tight hidden md:block">Paletto</span>
        </Link>
        
        <nav className="flex items-center gap-6">
            <Link href="/generate" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                Start Creating
            </Link>
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden md:block">
                Explore
            </Link>
          
          <div className="flex items-center gap-2">
            <ModeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full ring-2 ring-transparent hover:ring-primary/20 transition-all">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="" alt={user.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    My Palettes
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive cursor-pointer">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-3">
                 <Link href="/login">
                    <Button variant="ghost" size="sm" className="font-medium text-muted-foreground hover:text-foreground">
                        Sign In
                    </Button>
                 </Link>
                <Separator orientation="vertical" className="h-4 hidden sm:block" />
                <Link href="/register">
                    <Button size="sm" className="rounded-full bg-linear-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300">
                        Get Started
                    </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
