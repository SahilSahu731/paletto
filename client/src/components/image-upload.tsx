'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ImageIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming Shadcn utils exist
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  isLoading: boolean;
}

export function ImageUpload({ onImageSelected, isLoading }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  }, [onImageSelected]);

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    // We should probably callback to parent to clear file choice too if needed, 
    // but for now this visual clear is enough to let them pick again.
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxFiles: 1,
    disabled: isLoading,
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!preview ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key="upload-zone"
          >
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ease-in-out bg-background/50 hover:bg-background/80 backdrop-blur-sm",
                isDragActive ? "border-primary bg-primary/5 scale-[1.02]" : "border-border",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center gap-4">
                <div className={cn(
                  "p-4 rounded-full bg-secondary/10 text-secondary transition-transform duration-300",
                  isDragActive && "scale-110"
                )}>
                  <Upload className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    {isDragActive ? "Drop it here!" : "Drag & Drop your image"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Or click to browse (JPG, PNG, WebP up to 5MB)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            key="preview-zone"
            className="relative rounded-2xl overflow-hidden shadow-2xl border border-border group"
          >
            <img
              src={preview}
              alt="Preview"
              className="w-full max-h-[500px] object-contain bg-black/5"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <Button 
                    variant="destructive" 
                    size="icon" 
                    className="rounded-full w-12 h-12"
                    onClick={removeImage}
                    disabled={isLoading}
                 >
                    <X className="w-6 h-6" />
                 </Button>
            </div>
            {isLoading && (
               <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center">
                   <div className="flex flex-col items-center gap-3">
                       <span className="relative flex h-8 w-8">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-8 w-8 bg-primary"></span>
                        </span>
                       <span className="font-semibold text-foreground">Extracting colors...</span>
                   </div>
               </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
