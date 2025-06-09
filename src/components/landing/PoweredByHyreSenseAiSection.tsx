
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, TrendingUp, Globe, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: "Holistic Compatibility Mapping",
    description: "Beyond keywords. Our AI charts a multi-dimensional map of values, behaviors, and soft skills, ensuring perfect alignment with your team's core ethos.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-accent" />,
    title: "Future-Sight Analytics",
    description: "Look beyond the resume. HyreSense AI projects a candidate's growth trajectory, revealing their adaptability and potential to shape what's next for your organization.",
  },
  {
    icon: <Brain className="h-8 w-8 text-accent" />,
    title: "Evolving Intelligence Core",
    description: "Our AI is a dynamic, learning entity. It adapts and refines its understanding with every interaction, continuously enhancing the acuity of its talent discovery.",
  }
];

export function PoweredByHyreSenseAiSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [imageRef, isImageVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <h2 
              ref={titleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight mb-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              <span style={{ color: '#4670bf' }}>hyre<span style={{color:'#7a5fdb'}}>SENSE</span></span> AI Engine: Illuminating Talent's <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">True Potential</span>
            </h2>
            <p 
              ref={subtitleRef}
              className={cn(
                "text-lg text-muted-foreground mb-8 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isSubtitleVisible && "opacity-100 translate-y-0 delay-150"
              )}
              style={{ transitionDelay: isSubtitleVisible ? '150ms' : '0ms' }}
            >
              Our advanced AI doesn't just skim surfaces; it dives deep. Deciphering cultural synergy, forecasting growth trajectories, and illuminating the latent capabilities that define tomorrow's leaders. HyreSense doesn't just find hires; it architects futures.
            </p>
            <div className="space-y-6">
              {features.map((feature, index) => {
                const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
                return(
                  <div
                    key={feature.title}
                    ref={cardRef}
                    className={cn(
                      "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                      isCardVisible && "opacity-100 translate-y-0"
                    )}
                    style={{ transitionDelay: isCardVisible ? `${index * 150 + 300}ms` : '0ms' }}
                  >
                    <Card className="bg-card shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        {feature.icon}
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
          <div 
            ref={imageRef}
            className={cn(
              "md:order-1 opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isImageVisible && "opacity-100 translate-y-0 delay-300"
            )}
            style={{ transitionDelay: isImageVisible ? '300ms' : '0ms' }}
          >
            <Image 
              src="/robot.jpg" 
              alt="AI Brain and Neural Network" 
              width={500} 
              height={550}
              data-ai-hint="AI brain network"
              className="rounded-xl shadow-2xl mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

