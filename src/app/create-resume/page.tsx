
'use client';

import React, { useState, useRef, type ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, Edit3, ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';
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
      
      {/* Mobile View */}
      <div className="md:hidden relative w-[375px] h-[780px] bg-slate-900 rounded-[48px] border-[10px] border-slate-950 shadow-2xl overflow-hidden z-10">
        <div className="h-full w-full bg-card flex flex-col rounded-[38px] overflow-hidden">
          <header className="p-4 border-b border-border/50 bg-card/90 backdrop-blur-sm flex items-center justify-between sticky top-0 z-10 min-h-[60px]">
            <Button variant="ghost" size="icon" className="text-primary" onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div className="flex flex-col items-center">
                <Sparkles className="h-6 w-6 text-primary mb-0.5 opacity-80" />
                <h1 className="text-md font-semibold text-foreground -mt-1">Build Your Resume</h1>
            </div>
            <Image src="/logo.png" alt="HyreSense Logo" width={30} height={22} className="rounded-sm" />
          </header>
          <main className="flex-grow flex flex-col items-center justify-center p-6 space-y-8 bg-muted/20 dark:bg-slate-900/30">
            <div className="text-center -mt-8">
              <p className="text-sm text-muted-foreground mt-1">Choose your preferred method to create your HyreSense profile.</p>
            </div>
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

      {/* Desktop View */}
      <div className="hidden md:flex flex-col items-center justify-center w-full z-10">
         <Card className="w-full max-w-4xl bg-card/80 dark:bg-slate-800/70 backdrop-blur-xl shadow-2xl border border-border/30 rounded-2xl">
            <CardHeader className="text-center p-8">
              <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle className="text-4xl font-bold text-foreground">Build Your Professional Profile</CardTitle>
              <CardDescription className="text-muted-foreground text-lg pt-2 max-w-2xl mx-auto">
                Let's create a profile that stands out. Choose a starting point below to either upload an existing resume or build one from scratch.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8 pt-0 grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div 
                    className="group relative p-8 rounded-xl border-2 border-primary/30 hover:border-primary/70 bg-primary/5 hover:bg-primary/10 transition-all duration-300 cursor-pointer flex flex-col text-center items-center"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadCloud className="h-16 w-16 text-primary mb-4 transition-transform duration-300 group-hover:-translate-y-1" />
                    <h3 className="text-2xl font-semibold text-foreground">Upload Existing Resume</h3>
                    <p className="text-muted-foreground mt-2 mb-4 flex-grow">
                      Let our AI parse your resume and pre-fill your profile for a quick start. Supports PDF, DOCX (Max 5MB).
                    </p>
                     <p className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                        {fileName ? `Selected: ${fileName}` : "Choose File"}
                    </p>
                    <Input id="resume-upload-desktop" type="file" ref={fileInputRef} className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
                </div>
                <div 
                    className="group relative p-8 rounded-xl border-2 border-accent/30 hover:border-accent/70 bg-accent/5 hover:bg-accent/10 transition-all duration-300 cursor-pointer flex flex-col text-center items-center"
                    onClick={handleManualEntry}
                >
                    <Edit3 className="h-16 w-16 text-accent mb-4 transition-transform duration-300 group-hover:-translate-y-1" />
                    <h3 className="text-2xl font-semibold text-foreground">Enter Details Manually</h3>
                    <p className="text-muted-foreground mt-2 mb-4 flex-grow">
                      Perfect for starting fresh or fine-tuning every detail. We'll guide you through each section.
                    </p>
                    <p className="text-sm font-semibold text-accent group-hover:text-primary transition-colors flex items-center">
                        Start Building <ArrowRight className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </p>
                </div>
            </CardContent>
         </Card>
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
