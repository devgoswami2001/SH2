
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Target, TrendingUp, Users, Lightbulb, BarChartHorizontalBig } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function InvestorRelationsPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block">Invest in the Future of</span>
            <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mt-2">Talent Acquisition</span>
          </h1>
          <p className="mt-6 max-w-md mx-auto text-lg text-muted-foreground sm:text-xl md:mt-8 md:max-w-3xl">
            <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> is revolutionizing how companies find and hire top talent, and how professionals build their careers. We're seeking partners to join us on this transformative journey.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="#contact">Connect With Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Shaping the Future of Work
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              At <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span>, we believe in a world where everyone can find fulfilling work and every company can build its dream team, effortlessly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Target className="h-10 w-10 text-primary" />
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To empower job seekers and employers with intelligent, intuitive, and equitable tools that foster meaningful connections and drive career and organizational growth.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader>
                 <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-10 w-10 text-accent" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading AI-powered platform that redefines the talent landscape, making the hiring process transparent, efficient, and effective for all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Opportunity Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-base font-semibold text-primary tracking-wide uppercase">The <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> Advantage</h2>
            <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
              A New Era for Recruitment
            </p>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center">The Problem: An Outdated System</h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-center">
                Traditional hiring is often slow, biased, and inefficient. Job seekers struggle to find the right fit, and employers miss out on exceptional talent due to cumbersome processes and limited insights.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center">Our Solution: AI-Powered Precision</h3>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <Image 
                  src="https://placehold.co/600x400.png" 
                  alt="HyreSence Platform Showcase" 
                  width={600} 
                  height={400}
                  data-ai-hint="technology platform"
                  className="rounded-lg shadow-xl" 
                />
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground">
                    <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> leverages cutting-edge AI to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide intelligent job and candidate matching.</li>
                    <li>Offer skill-gap analysis and development suggestions.</li>
                    <li>Deliver predictive analytics for smarter hiring decisions.</li>
                    <li>Streamline the application and screening process.</li>
                  </ul>
                  <p className="text-lg text-muted-foreground">
                    We're creating a more dynamic, responsive, and fair job market.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-center">Market Opportunity</h3>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-center">
                The global recruitment market is valued at over $600 billion and is rapidly evolving. The demand for AI-driven HR technology is skyrocketing as businesses seek to optimize talent acquisition and workforce management. <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span> is perfectly positioned to capture a significant share of this expanding market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Invest in HyreSence? Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Why Invest in <span style={{color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span> </span>?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center shadow-lg">
              <CardHeader className="items-center">
                <TrendingUp className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Innovative Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Proprietary AI algorithms and a user-centric platform designed for scalability and impact.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardHeader className="items-center">
                <BarChartHorizontalBig className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Large & Growing Market</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Addressing a critical need in a multi-billion dollar global industry with strong tailwinds.</p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg">
              <CardHeader className="items-center">
                <Users className="h-12 w-12 text-primary mb-2" />
                <CardTitle>Experienced Team (Placeholder)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Led by a passionate team with expertise in AI, HR technology, and business development (Details to be expanded).</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section id="contact" className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
            Partner With Us to Shape the Future
          </h2>
          <p className="mt-4 text-lg opacity-90">
            We're looking for strategic investors who share our vision and are excited to be part of the next generation of talent technology.
          </p>
          <div className="mt-10">
            {/* This would ideally link to a contact form or a dedicated investor portal section */}
            <p className="text-lg opacity-90 mb-4">
              For investment inquiries, please reach out to:
            </p>
            <a href="mailto:investors@hyresence.com" className="text-xl font-semibold hover:underline">
              contact@hyresense.com
            </a>
            <p className="mt-6 text-sm opacity-80">
              We look forward to discussing how we can build the future of work, together.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
