'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import { ImageUpload } from '@/components/image-upload';
import { PaletteDisplay } from '@/components/palette-display';
import api from '@/lib/axios'; // Make sure this is your configured axios instance
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function GeneratePage() {
  const [colors, setColors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: authLoading } = useAuthStore();
  const router = useRouter();

  // Protect route
  useEffect(() => {
    if (!authLoading && !user) {
        router.push('/login');
    }
  }, [authLoading, user, router]);

  const handleImageSelected = async (file: File) => {
    setIsLoading(true);
    setColors([]); // Reset previous results

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post('/palette/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setColors(response.data.colors);
      }
    } catch (error) {
      console.error('Failed to extract colors', error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || !user) return null; // Or a loading spinner

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-24 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight">Generate Palette from Image</h1>
            <p className="text-muted-foreground text-lg">
                Upload any image to instantly extract its dominant colors and build a stunning palette.
            </p>
        </div>

        <ImageUpload onImageSelected={handleImageSelected} isLoading={isLoading} />

        {colors.length > 0 && <PaletteDisplay colors={colors} />}
      </main>
    </div>
  );
}
