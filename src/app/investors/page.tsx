
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, TrendingUp, Users, Cpu, Scaling, ArrowRight, Banknote, Presentation } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  })
};


export default function InvestorRelationsPage() {
  const [marketStat1Ref, isMarketStat1Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [marketStat2Ref, isMarketStat2Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [marketStat3Ref, isMarketStat3Visible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const whyInvestCards = [
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true }),
  ];

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24 md:py-40 text-center overflow-hidden bg-grid-pattern"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
         <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent z-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h1 
            variants={itemVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span className="block">Invest in the Future of</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">Talent Intelligence</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl"
          >
            HyreSense is redefining the multi-billion dollar recruitment industry with a proprietary AI engine. We're seeking visionary partners to accelerate our growth and capture the market.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button size="lg" asChild className="mt-10 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow">
              <Link href="#contact">Request Investor Deck</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* The Opportunity Section */}
      <section className="py-16 sm:py-24">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div variants={itemVariants}>
                    <Card className="p-6 border-destructive/50 bg-destructive/5 shadow-xl transition-all duration-300 hover:shadow-destructive/20 transform hover:-translate-y-1">
                        <h3 className="text-2xl font-bold text-destructive mb-3 flex items-center gap-2"><Target className="h-7 w-7"/> The Problem</h3>
                        <p className="text-lg text-muted-foreground">The <strong className="text-foreground">$600B+</strong> global recruitment market is plagued by inefficiency. Traditional methods are slow, biased, and fail to identify true potential, costing companies billions in mismatched hires and lost productivity.</p>
                    </Card>
                </motion.div>
                 <motion.div variants={itemVariants}>
                     <Card className="p-6 border-primary/50 bg-primary/5 shadow-xl transition-all duration-300 hover:shadow-primary/20 transform hover:-translate-y-1">
                        <h3 className="text-2xl font-bold text-primary mb-3 flex items-center gap-2"><Lightbulb className="h-7 w-7"/> Our Solution</h3>
                        <p className="text-lg text-muted-foreground">HyreSense provides an <strong className="text-foreground">AI-powered, mobile-first platform</strong> that delivers intelligent matching, predictive analytics, and skill-gap analysis, creating a hyper-efficient and equitable talent ecosystem.</p>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
      </section>

      {/* Market Opportunity */}
      <section className="py-16 sm:py-24 bg-secondary/10 dark:bg-slate-900/50">
          <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants} className="text-center mb-16">
                 <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                    A Generational Market Shift
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                    The HR Tech landscape is undergoing a massive transformation driven by AI. HyreSense is positioned at the epicenter of this change, poised to capture a significant share of a rapidly expanding market.
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {[
                    { ref: marketStat1Ref, isVisible: isMarketStat1Visible, value: "$600B+", label: "Global Recruitment Market", delay: 0 },
                    { ref: marketStat2Ref, isVisible: isMarketStat2Visible, value: "35% CAGR", label: "AI in HR Tech Growth", delay: 1 },
                    { ref: marketStat3Ref, isVisible: isMarketStat3Visible, value: "80%+", label: "Of Companies Adopting AI for Hiring", delay: 2 },
                ].map((stat, i) => (
                     <motion.div 
                        key={stat.label}
                        custom={i}
                        variants={statVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        className="p-6 bg-card/70 backdrop-blur-sm rounded-lg shadow-xl border border-border/30"
                    >
                        <p className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{stat.value}</p>
                        <p className="mt-2 text-sm font-medium text-muted-foreground tracking-wide uppercase">{stat.label}</p>
                    </motion.div>
                ))}
            </div>
          </motion.div>
      </section>

      {/* Why Invest in HyreSense? Section */}
      <section className="py-16 sm:py-24">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Why Invest in HyreSense?
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Cpu className="h-10 w-10 text-primary mb-4" />, 
                title: "Proprietary AI Engine", 
                content: "Our core technology provides a durable competitive advantage, delivering superior matching and insights that generic platforms cannot replicate." 
              },
              { 
                icon: <Scaling className="h-10 w-10 text-primary mb-4" />, 
                title: "Scalable Business Model", 
                content: "A SaaS-based subscription model targeting both individual job seekers and enterprise clients, ensuring diverse and recurring revenue streams." 
              },
              { 
                icon: <Users className="h-10 w-10 text-primary mb-4" />, 
                title: "Experienced Founding Team", 
                content: "Led by a passionate team with deep expertise in AI, HR technology, and scalable business growth (details available in investor deck)." 
              }
            ].map((item, index) => {
              return (
                 <motion.div key={item.title} custom={index} variants={statVariants}>
                    <Card className="text-left shadow-lg h-full p-6 bg-card/60 backdrop-blur-sm border-border/30 hover:border-primary/50 hover:shadow-primary/10 transition-all transform hover:-translate-y-1">
                        {item.icon}
                        <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.content}</p>
                    </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

    {/* New Sections: Business Model & Use of Funds */}
    <section className="py-16 sm:py-24 bg-secondary/10 dark:bg-slate-900/50">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <motion.div variants={itemVariants}>
                    <Card className="p-6 shadow-xl h-full">
                        <CardHeader className="p-0 mb-4">
                          <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3"><Banknote className="h-8 w-8 text-primary"/> Business Model</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-3 text-muted-foreground">
                            <p>Our dual-revenue stream model ensures financial stability and broad market penetration.</p>
                            <p><strong className="text-foreground">Job Seekers:</strong> A freemium model with premium subscription tiers unlocking advanced career tools, mock interviews, and profile enhancement features.</p>
                            <p><strong className="text-foreground">Recruiters/Employers:</strong> A tiered SaaS subscription providing access to our AI-powered candidate pool, analytics dashboards, and integrated hiring workflows.</p>
                        </CardContent>
                    </Card>
                </motion.div>
                 <motion.div variants={itemVariants}>
                     <Card className="p-6 shadow-xl h-full">
                        <CardHeader className="p-0 mb-4">
                            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3"><Presentation className="h-8 w-8 text-accent"/> Use of Funds</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 space-y-3 text-muted-foreground">
                            <p>This seed round will fuel our strategic growth initiatives across key areas.</p>
                            <p><strong className="text-foreground">Technology:</strong> 50% allocated to R&D for enhancing our AI engine and platform features.</p>
                            <p><strong className="text-foreground">Marketing & Sales:</strong> 30% to drive user acquisition and enterprise client onboarding.</p>
                             <p><strong className="text-foreground">Operations:</strong> 20% for team expansion and operational scaling.</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
      </section>
      
      {/* Call to Action Section */}
      <section id="contact" className="py-20 sm:py-28 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <motion.div 
            className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Partner With Us to Shape the Future
          </motion.h2>
          <motion.p variants={itemVariants} className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            We are looking for strategic investors who share our vision to build the future of talent acquisition. Connect with us to learn more about this unique opportunity.
          </motion.p>
          <motion.div variants={itemVariants}>
             <Button size="lg" variant="secondary" asChild className="mt-10 bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 group">
                <a href="mailto:contact@hyresense.com">
                Contact Investor Relations <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      <style jsx global>{`
        .bg-grid-pattern {
            background-image:
                linear-gradient(to right, hsl(var(--border) / 0.5) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(var(--border) / 0.5) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
      `}</style>
    </div>
  );
}

    