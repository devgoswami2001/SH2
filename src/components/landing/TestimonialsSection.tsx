
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    quote: "HyreSense made my job search so much more engaging and efficient. The AI suggestions were spot on!",
    name: "Sarah L.",
    role: "Software Engineer",
    avatar: "https://placehold.co/80x80.png?text=SL"
  },
  {
    quote: "As an HR manager, finding the right talent used to be a chore. HyreSense's AI candidate ranking is a game-changer for us.",
    name: "John B.",
    role: "HR Manager, Tech Solutions Inc.",
    avatar: "https://placehold.co/80x80.png?text=JB"
  },
  {
    quote: "I love the profile tracker! It motivated me to complete my profile and I landed interviews much faster.",
    name: "Maria G.",
    role: "Marketing Specialist",
    avatar: "https://placehold.co/80x80.png?text=MG"
  }
];

export function TestimonialsSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [subtitleRef, isSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-background"
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 
            ref={titleRef}
            className={cn(
              "text-base font-semibold text-primary tracking-wide uppercase opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Success Stories
          </h2>
          <p 
            ref={subtitleRef}
            className={cn(
              "mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isSubtitleVisible ? '200ms' : '0ms' }}
          >
            Loved by Job Seekers and HR Teams
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const [cardRef, isCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
            return (
              <div
                key={testimonial.name}
                ref={cardRef}
                className={cn(
                  "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                  isCardVisible && "opacity-100 translate-y-0"
                )}
                style={{ transitionDelay: isCardVisible ? `${index * 150}ms` : '0ms' }}
              >
                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <blockquote className="text-muted-foreground italic flex-grow">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 flex items-center">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <p className="font-semibold text-foreground">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
