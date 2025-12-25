
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Rocket, Users, Heart, Sparkles, Building, Handshake, Gem, Goal } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const heroContainerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, description, index }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
    custom={index}
  >
    <Card className="bg-card/60 dark:bg-slate-800/50 backdrop-blur-sm shadow-xl hover:shadow-primary/20 transition-all duration-300 h-full border border-border/30 hover:border-primary/50 transform hover:-translate-y-2">
      <CardHeader className="items-center text-center">
        <motion.div 
            className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl mb-4 ring-1 ring-inset ring-border/50"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
          {icon}
        </motion.div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center text-muted-foreground">
        <p>{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export default function AboutUsPage() {
  const values = [
      { icon: <Sparkles className="h-8 w-8 text-accent"/>, title: "Innovation", description: "We constantly push the boundaries of what's possible." },
      { icon: <Gem className="h-8 w-8 text-accent"/>, title: "Integrity", description: "We operate with transparency and honesty in everything we do." },
      { icon: <Goal className="h-8 w-8 text-accent"/>, title: "Excellence", description: "We are committed to delivering the highest quality solutions." },
  ];

  return (
    <div className="text-foreground bg-background">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 md:py-40 text-center overflow-hidden"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
         <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent z-10"></div>
         <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_70%)]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 animate-pulse_slow_bg"></div>
         </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1
            variants={textVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            We're <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">HyreSense</span>
          </motion.h1>
          <motion.p
            variants={textVariants}
            className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl"
          >
            Connecting Futures, One Swipe at a Time. We are passionate about making the world of work more intelligent, intuitive, and human.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Our Core Purpose
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <InfoCard
              icon={<Lightbulb className="h-10 w-10 text-primary" />}
              title="Our Vision"
              description="To create the world’s most intuitive and intelligent career platform, where opportunity and talent connect instantly and meaningfully."
              index={0}
            />
            <InfoCard
              icon={<Rocket className="h-10 w-10 text-accent" />}
              title="Our Mission"
              description="To empower professionals and companies by transforming the recruitment process into a seamless, data-driven, and mobile-first experience."
              index={1}
            />
          </div>
        </div>
      </section>

      {/* Our Story Section */}
       <section className="py-16 sm:py-24 bg-secondary/10 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
                className="grid lg:grid-cols-2 gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={heroContainerVariants}
            >
              <motion.div variants={textVariants}>
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  The <span className="text-accent">HyreSense</span> Story
                </h2>
                <div className="mt-6 space-y-6 text-muted-foreground text-lg">
                  <p>HyreSense was born from a simple but powerful observation: the traditional job market is broken. It's slow, impersonal, and frustrating for both job seekers and employers.</p>
                  <p>We envisioned a future where finding a job is as easy as a swipe, and finding the right talent is no longer a search for a needle in a haystack. By putting a mobile-first, AI-powered platform at the core, we're making recruitment faster, smarter, and fundamentally more human.</p>
                </div>
              </motion.div>
              <motion.div variants={cardVariants} custom={2}>
                 <Card className="bg-card/60 backdrop-blur-sm shadow-xl border border-border/30 transform transition-all duration-500 hover:scale-105 hover:shadow-accent/20">
                     <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-accent/10 rounded-lg"><Heart className="h-8 w-8 text-accent"/></div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">From Frustration to Innovation</h3>
                                <p className="text-sm text-muted-foreground mt-1">We replaced endless forms with an intuitive swipe, and keyword searching with deep, intelligent matching.</p>
                            </div>
                        </div>
                        <hr className="my-4 border-border/50" />
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg"><Sparkles className="h-8 w-8 text-primary"/></div>
                            <div>
                                <h3 className="text-lg font-semibold text-foreground">The AI Advantage</h3>
                                <p className="text-sm text-muted-foreground mt-1">For candidates, it means opportunities that truly fit. For recruiters, it means a curated shortlist of top-tier talent, delivered instantly.</p>
                            </div>
                        </div>
                     </CardContent>
                 </Card>
              </motion.div>
            </motion.div>
          </div>
       </section>
        
      {/* Our Values Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
                className="text-center mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={textVariants}
            >
                <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">Our Core Values</h2>
                <p className="mt-4 text-lg text-muted-foreground">The principles that guide our decisions and define our culture.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                    <motion.div
                        key={value.title}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        custom={index}
                    >
                        <Card className="text-center p-6 bg-card/60 backdrop-blur-sm shadow-lg hover:shadow-accent/20 transition-all duration-300 h-full border border-border/30 transform hover:-translate-y-2">
                           <div className="inline-block p-4 bg-accent/10 rounded-xl mb-4 ring-1 ring-inset ring-border/50">{value.icon}</div>
                            <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                            <p className="mt-2 text-muted-foreground text-sm">{value.description}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Corporate Information Section */}
      <section className="py-16 sm:py-24">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroContainerVariants}
        >
            <motion.h2 
                variants={textVariants}
                className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground"
            >
                Corporate Information
            </motion.h2>
            <motion.div variants={textVariants}>
                <Card className="shadow-xl p-6 bg-card/60 backdrop-blur-sm border border-border/30 max-w-lg mx-auto mt-8">
                    <CardContent className="p-0 space-y-3 text-muted-foreground text-sm">
                        <div className="flex items-center justify-center gap-2">
                            <Building className="h-5 w-5 text-primary"/>
                            <p>A part of <span className="font-semibold text-foreground">MokshDan Solutions OPC Pvt Ltd</span></p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <p><strong>TAN:</strong> LKNM14341F</p>
                            <p><strong>PAN:</strong> AARCM7411P</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-primary/90 to-accent/90">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={heroContainerVariants}
        >
          <motion.div
             variants={textVariants}
             className="relative w-32 h-32 mx-auto mb-8"
          >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                    className="p-5 bg-primary-foreground/90 backdrop-blur-md rounded-full shadow-2xl border-2 border-primary-foreground/30"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                >
                  <Image 
                    src="/logo.png" 
                    alt="HyreSense Logo" 
                    width={48}
                    height={30}
                  />
                </motion.div>
              </div>
          </motion.div>
          <motion.h2 
            variants={textVariants}
            className="text-3xl lg:text-4xl font-extrabold tracking-tight text-primary-foreground"
          >
            Join the HyreSense Revolution
          </motion.h2>
          <motion.p 
            variants={textVariants}
            className="mt-4 text-lg text-primary-foreground/90 max-w-xl mx-auto"
          >
            Ready to experience a smarter way to find jobs or hire talent? Explore HyreSense and see the difference AI can make.
          </motion.p>
          <motion.div variants={textVariants}>
            <Button size="lg" variant="secondary" asChild className="mt-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105">
              <Link href="/features">Discover Our Features</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

    