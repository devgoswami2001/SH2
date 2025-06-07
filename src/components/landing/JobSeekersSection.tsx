
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Zap, Lightbulb, TrendingUp, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: "Swipe to Apply",
    description: "Effortlessly apply for jobs with a simple swipe, just like your favorite dating app. Say goodbye to tedious applications.",
    visual: <Image src="https://placehold.co/150x300.png" alt="Swipe interface" width={100} height={200} data-ai-hint="mobile ui" className="rounded-lg shadow-md mx-auto mt-4" />
  },
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "AI Skill-Gap Suggestions",
    description: "Our AI analyzes your profile and suggests skills to learn, like 'Master Python for data science roles', to boost your employability.",
    visual: <div className="mt-4 p-3 bg-secondary/50 rounded-lg text-sm text-secondary-foreground">"Consider learning <strong className='text-primary'>Advanced Excel</strong> to improve your chances for financial analyst roles."</div>
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Visual Profile Tracker",
    description: "Monitor your profile's strength and completeness with our intuitive visual meter. Know exactly what to improve to attract top employers.",
    visual: (
      <div className="mt-4 space-y-2">
        <div className="flex justify-between text-sm font-medium text-muted-foreground">
          <span>Profile Strength</span>
          <span>75%</span>
        </div>
        <Progress value={75} aria-label="Profile strength 75%" className="h-3" />
         <p className="text-xs text-muted-foreground text-center mt-1">Complete your experience section to reach 100%!</p>
      </div>
    )
  }
];

export function JobSeekersSection() {
  return (
    <section id="job-seekers" className="py-16 sm:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">For Job Seekers</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            Land Your Dream Job, Smarter
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between text-center">
                <CardDescription className="text-base">{feature.description}</CardDescription>
                {feature.visual && <div className="mt-6">{feature.visual}</div>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
