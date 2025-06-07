
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, BarChart3, Target, UsersRound } from 'lucide-react';

const benefits = [
  {
    icon: <Brain className="h-10 w-10 text-accent" />,
    title: "Smart Suggestions",
    description: "AI-driven recommendations for both job seekers and employers, ensuring optimal matches."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-accent" />,
    title: "Real-time Insights",
    description: "Access live data on job market trends, applicant pools, and hiring efficiency."
  },
  {
    icon: <Target className="h-10 w-10 text-accent" />,
    title: "Skill Gap Detection",
    description: "Identify skill discrepancies for job seekers and guide them towards upskilling opportunities."
  },
  {
    icon: <UsersRound className="h-10 w-10 text-accent" />,
    title: "Predictive Hiring",
    description: "Leverage AI to forecast hiring needs and identify future top performers effectively."
  }
];

export function AiBenefitsSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">AI-Powered Advantage</h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            Unlock the Future of Recruitment
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                {benefit.icon}
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
