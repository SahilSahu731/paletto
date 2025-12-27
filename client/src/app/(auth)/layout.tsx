'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);


  return (
    <div className="min-h-screen w-full flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-12 relative bg-background">
        <div className="w-full max-w-[400px]">
          {children}
        </div>
      </div>

      {/* Right side - Image/Decorative */}
      <div className="hidden lg:flex w-1/2 relative bg-muted text-white overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-bl from-primary/80 to-secondary/80 z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
        
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-12">
            <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40" />
                 <span className="font-bold text-xl tracking-tight text-white">Paletto</span>
            </div>
            
            <div className="space-y-6">
                <h2 className="text-4xl font-extrabold leading-tight">
                    "Color is a power which directly influences the soul."
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="text-lg text-white/90 font-medium">— Wassily Kandinsky</p>
                    <p className="text-sm text-white/60">Artist & Art Theorist</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
