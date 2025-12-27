'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Droplets, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface Color {
  name: string;
  hex: string;
  rgb: string;
  hsl: { h: number; s: number; l: number };
  population: number;
  titleTextColor: string;
  bodyTextColor: string;
}

interface PaletteDisplayProps {
  colors: Color[];
}

export function PaletteDisplay({ colors }: PaletteDisplayProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
      <div className="flex items-center gap-2 mb-4">
         <Droplets className="w-6 h-6 text-primary" />
         <h2 className="text-2xl font-bold">Extracted Palette</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {colors.map((color, index) => (
          <motion.div
            key={color.hex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
          >
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div 
                    className="h-32 w-full transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                />
                
                <div className="p-4 space-y-3 bg-card">
                    <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">{color.name.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <div className="flex items-center justify-between">
                             <span className="font-mono font-bold text-lg">{color.hex}</span>
                             <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                onClick={() => copyToClipboard(color.hex)}
                             >
                                {copied === color.hex ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                             </Button>
                        </div>
                    </div>
                    
                    <div className="pt-2 border-t border-border/50 text-xs space-y-1 text-muted-foreground font-mono">
                        <div className="flex justify-between">
                            <span>RGB</span>
                            <span>{color.rgb.replace('rgb(', '').replace(')', '')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>HSL</span>
                            <span>{color.hsl.h}°, {color.hsl.s}%, {color.hsl.l}%</span>
                        </div>
                    </div>
                </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
