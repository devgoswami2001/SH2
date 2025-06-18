
'use client';

import React, { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Edit3, ArrowLeft, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function CreateResumePage() {
  const [pageContainerRef, isPageContainerVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real app, you'd process the file here.
      // For now, we just navigate to the build-resume page.
      router.push('/build-resume?method=upload');
    }
  };

  const handleManualEntry = () => {
    router.push('/build-resume?method=manual');
  };

  return (
    <div
      ref={pageContainerRef}
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-gradient-animated p-4 overflow-hidden opacity-0 translate-y-10 transition-all duration-1000 ease-out",
        isPageContainerVisible && "opacity-100 translate-y-0"
      )}
    >
      <div className="absolute inset-0 opacity-20 dark:opacity-15"></div>
      <div className="relative w-[375px] h-[780px] bg-slate-900 rounded-[48px] border-[10px] border-slate-950 shadow-2xl overflow-hidden z-10">
        {/* Notch Removed */}
        <div className="h-full w-full bg-card flex flex-col rounded-[38px] overflow-hidden">
          {/* App-like Header Reinstated */}
          <header className="p-4 border-b border-border/50 bg-card/90 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[60px]">
            <Button variant="ghost" size="icon" className="text-primary" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex flex-col items-center">
                {/* <Sparkles className="h-6 w-6 text-primary mb-0.5 opacity-80" /> */}
                <h1 className="text-md font-semibold text-foreground -mt-1">Build Your Resume</h1>
            </div>
            <Image src="/logo.png" alt="HyreSense Logo" width={30} height={22} className="rounded-sm" />
          </header>

          {/* Main Content Area */}
          <main className="flex-grow flex flex-col items-center justify-center p-6 space-y-8 bg-muted/20 dark:bg-slate-900/30">
            <div className="text-center -mt-8">
              <p className="text-sm text-muted-foreground mt-1">Choose your preferred method to create your HyreSense profile.</p>
            </div>

            {/* Option 1: Upload Resume */}
            <Card
              className="w-full p-0 bg-card/90 backdrop-blur-md shadow-xl border border-primary/30 hover:border-primary/60 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <Label htmlFor="resume-upload" className="block cursor-pointer">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <UploadCloud className="h-12 w-12 text-primary mb-3" />
                  <h3 className="text-lg font-semibold text-foreground">Upload Resume</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {fileName ? `Selected: ${fileName}` : "Supports PDF, DOCX (Max 5MB)"}
                  </p>
                </CardContent>
              </Label>
              <Input
                id="resume-upload"
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
              />
            </Card>

            {/* Option 2: Enter Manually */}
            <Card
              className="w-full p-0 bg-card/90 backdrop-blur-md shadow-xl border border-border/40 hover:border-accent/60 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
              onClick={handleManualEntry}
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Edit3 className="h-12 w-12 text-accent mb-3" />
                <h3 className="text-lg font-semibold text-foreground">Enter Details Manually</h3>
                <p className="text-xs text-muted-foreground mt-1">Build your profile step-by-step.</p>
              </CardContent>
            </Card>

            <p className="text-xs text-muted-foreground text-center mt-6 px-4">
              Your resume helps our AI match you with the best opportunities.
            </p>
          </main>
        </div>
      </div>
      <style jsx global>{`
        @keyframes pulse_slow_bg {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .bg-gradient-animated {
          background: linear-gradient(-45deg, hsl(var(--background)) 30%, hsl(var(--primary)/0.05) 50%, hsl(var(--accent)/0.05) 70%, hsl(var(--background)) 90%);
          background-size: 400% 400%;
          animation: pulse_slow_bg 15s ease infinite;
        }
      `}</style>
    </div>
  );
}
