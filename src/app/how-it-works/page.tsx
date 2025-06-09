
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, UserPlus, Copy, BarChartBig, Lightbulb, Target, Rocket, Users, TrendingUp, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const steps = [
  {
    icon: <UserPlus className="h-10 w-10 text-primary" />,
    title: "1. Create Your Profile",
    description: "Job seekers build a standout profile showcasing skills and experience. Employers detail their company culture and job requirements."
  },
  {
    icon: <Copy className="h-10 w-10 text-primary" />,
    title: "2. AI-Powered Matching",
    description: "Our intelligent algorithms go to work! Job seekers discover AI-matched job opportunities. Employers receive a curated list of top candidates."
  },
  {
    icon: <BarChartBig className="h-10 w-10 text-primary" />,
    title: "3. Gain Valuable Insights",
    description: "Job seekers get AI-powered skill gap analysis and career advice. Employers access hiring analytics and candidate insights to make informed decisions."
  },
  {
    icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
    title: "4. Connect & Succeed",
    description: "Seamlessly apply for matched jobs or initiate contact with ideal candidates. HyreSense facilitates the connection for successful placements."
  }
];

export default function HowItWorksPage() {
  return (
    <div className="text-foreground py-12 sm:py-16"> {/* Ensure bg-background is removed here */}
      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-primary/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            How <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"><span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span></span> Works
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
            Discover the simple, intelligent process that connects talent with opportunity and empowers your career or hiring journey.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Your Journey with <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to unlock a smarter way to hire and get hired.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {steps.map((step) => (
              <Card key={step.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {step.icon}
                    <CardTitle className="text-2xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-base">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goals Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
             <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
              Our Driving Force
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              What we aim to achieve and the principles that guide us.
            </p>
          </div>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Lightbulb className="h-10 w-10 text-primary" />
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  To be the leading AI-powered platform that redefines the talent landscape, making the hiring process transparent, efficient, and effective for all.
                </p>
              </CardContent>
            </Card>
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
                  <Rocket className="h-10 w-10 text-primary" />
                  <CardTitle className="text-2xl">Our Goals</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-accent mt-1 shrink-0" />
                    <p className="text-muted-foreground"><strong>For Job Seekers:</strong> Find fulfilling roles that match skills and aspirations quickly and easily.</p>
                </div>
                <div className="flex items-start gap-2">
                    <Briefcase className="h-5 w-5 text-accent mt-1 shrink-0" />
                    <p className="text-muted-foreground"><strong>For Employers:</strong> Discover and hire top talent efficiently, reducing time-to-hire and improving match quality.</p>
                </div>
                 <div className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-accent mt-1 shrink-0" />
                    <p className="text-muted-foreground"><strong>Overall:</strong> Continuously innovate using AI to create a fair, intelligent, and dynamic job market.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Image 
            src="https://placehold.co/600x300.png" 
            alt="Diverse team collaborating" 
            width={600} 
            height={300} 
            data-ai-hint="team collaboration"
            className="rounded-lg shadow-xl mx-auto mb-8"
          />
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Ready to Experience the <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span> Difference?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join our platform today and take the next step in your career or find the perfect addition to your team.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/">Get Started as a Job Seeker</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/">Find Talent as an Employer</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
