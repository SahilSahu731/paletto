'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import Navbar from '@/components/navbar';
import { Palette, Share2, Download, Wand2, Layers, Zap } from 'lucide-react';

export default function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col pt-16">
         {/* Hero Section */}
         <section className="relative px-4 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
             <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10" />
             <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10" />
             
             <div className="inline-flex items-center rounded-full border border-primary/20 bg-background/50 px-3 py-1 text-sm font-medium text-primary backdrop-blur-xl mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                v1.0 is now live
             </div>

             <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-text pb-4 leading-tight">
                Master Every Color.
             </h1>
             <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Extract, generate, and manage stunning color palettes for your next project.
                Powered by advanced algorithms inspired by color theory and designed for creators.
             </p>
             
             <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
                {!user ? (
                    <Link href="/register" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full h-12 px-8 text-lg rounded-full bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all text-white border-0">
                            Start Creating Free <Zap className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                ) : (
                    <Link href="/generate" className="w-full sm:w-auto">
                        <Button size="lg" className="w-full h-12 px-8 text-lg rounded-full bg-linear-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/25 transition-all text-white border-0">
                            Generate Palette <Zap className="ml-2 h-4 w-4" />
                        </Button>
                    </Link>
                )}
                 <Button variant="outline" size="lg" className="w-full h-12 px-8 text-lg rounded-full backdrop-blur-sm sm:w-auto">
                    View Gallery
                </Button>
             </div>

             {/* Visual Demo Placeholder */}
             <div className="w-full max-w-5xl h-[400px] md:h-[600px] rounded-2xl border border-white/10 bg-black/5 backdrop-blur-sm shadow-2xl mt-20 flex items-center justify-center relative overflow-hidden group perspective-1000">
                {/* Mockup Interface */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5" />
                <div className="absolute inset-4 rounded-xl border border-white/5 bg-background/40 backdrop-blur-md flex flex-col overflow-hidden shadow-inner">
                    <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                        <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <span className="text-muted-foreground font-medium text-lg flex items-center gap-2">
                            <Wand2 className="h-5 w-5" />
                            Drag & Drop Image to Extract Colors
                        </span>
                    </div>
                </div>
             </div>
         </section>
         
         {/* Features Section */}
         <section className="py-24 px-4 container mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/70 mb-4">Built for Modern Design</h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything you need to create, manage, and export color palettes without the headache.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <FeatureCard 
                    icon={<Palette className="h-8 w-8 text-primary" />}
                    title="Smart Extraction"
                    description="Upload an image and let our algorithms extract the most dominant and meaningful colors automatically."
                />
                <FeatureCard 
                    icon={<Share2 className="h-8 w-8 text-secondary" />}
                    title="Seamless Sharing"
                    description="Create shareable links for your palettes or export them directly to CSS, Tailwind, or JSON."
                />
                <FeatureCard 
                    icon={<Layers className="h-8 w-8 text-purple-500" />}
                    title="Palette Management"
                    description="Organize your color schemes into projects and collections. Never lose a hex code again."
                />
            </div>
         </section>

         {/* Call to Action */}
         <section className="py-24 px-4 border-t border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-background to-primary/5 -z-10" />
            <div className="container mx-auto text-center max-w-3xl space-y-8">
                <h2 className="text-4xl md:text-5xl font-bold">Ready to color your world?</h2>
                <p className="text-xl text-muted-foreground">Join thousands of designers and developers who trust Paletto for their color needs.</p>
                <div className="flex justify-center pt-4">
                     <Link href="/register">
                         <Button size="lg" className="h-14 px-10 text-xl rounded-full bg-foreground text-background hover:bg-foreground/90 hover:scale-105 transition-all duration-300">
                             Get Started Now
                         </Button>
                     </Link>
                </div>
            </div>
         </section>
      </main>
      
      <footer className="border-t border-white/5 py-12 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-linear-to-br from-primary to-secondary" />
                <span className="font-bold text-lg tracking-tight">Paletto</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
                <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
                <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
            </div>
            <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Paletto. All rights reserved.
            </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl border border-white/5 bg-background/40 backdrop-blur-sm hover:border-primary/20 hover:bg-background/60 transition-all duration-300 group">
            <div className="mb-6 p-4 rounded-xl bg-background/50 w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}
