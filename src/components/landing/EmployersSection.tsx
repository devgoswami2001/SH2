
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BarChart2, Filter, Sparkles } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "AI Hiring Assistant",
    description: "Our intelligent assistant sifts through candidates to suggest top matches based on skills, experience, and cultural fit.",
    visual: <p className="mt-4 p-3 bg-secondary/50 rounded-lg text-sm text-secondary-foreground">Top candidate: <strong>Jane Doe</strong> (92% match)</p>
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    title: "In-Depth Analytics",
    description: "Gain insights on applicant fit, diversity metrics, and reduce your time-to-hire with comprehensive analytics.",
    visual: <Image src="https://placehold.co/300x200.png" alt="Analytics graph" width={200} height={133} data-ai-hint="analytics graph" className="rounded-lg shadow-md mx-auto mt-4" />
  },
  {
    icon: <Filter className="h-8 w-8 text-primary" />,
    title: "Smart Filters & Scores",
    description: "Utilize advanced filters and AI-generated candidate scores to quickly pinpoint the most qualified applicants for your roles.",
    visual: <p className="mt-4 p-3 bg-secondary/50 rounded-lg text-sm text-secondary-foreground">Filtered by: <strong>Seniority, Python, Remote</strong></p>
  }
];

export function EmployersSection() {
  return (
    <section id="employers" className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">For Employers</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            Hire Top Talent, Faster
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
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
