'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-20 pb-12 md:pt-32 md:pb-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block">Revolutionize How You</span>
          <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">Find and Hire Talent</span>
        </h1>
        <p className="mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl">
          AI-powered job matching. <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span> connects top talent with innovative companies, faster and smarter.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" className="w-full sm:w-auto group">
            For Job Seekers
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto">
            For Employers
          </Button>
        </div>
      </div>
      <div className="mt-16 md:mt-24 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="relative w-[280px] h-[580px] md:w-[250px] md:h-[500px] group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Image
              src="/sa.jpg"
              alt="HyreSence App on Phone"
              width={280}
              height={580}
              data-ai-hint="phone app"
              className="relative rounded-3xl shadow-2xl object-cover border-4 border-background"
              priority
            />
          </div>
          <div className="relative w-full max-w-xl md:w-[500px] md:h-[350px] group mt-8 md:mt-0">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-xl blur-md opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt-opposite"></div>
            <Image
              src="https://placehold.co/500x350.png"
              alt="HyreSence Dashboard"
              width={500}
              height={350}
              data-ai-hint="dashboard analytics"
              className="relative rounded-xl shadow-2xl object-cover border-4 border-background"
            />
          </div>
        </div>
      </div>
      {/* The page background is currently rendered by a Three.js script in src/app/layout.tsx */}
    </section>
  );
}
