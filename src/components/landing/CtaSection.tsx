
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

export function CtaSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.2, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [textRef, isTextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });
  const [formRef, isFormVisible] = useScrollAnimation<HTMLFormElement>({ threshold: 0.2, triggerOnce: true });
  const [subtextRef, isSubtextVisible] = useScrollAnimation<HTMLParagraphElement>({ threshold: 0.2, triggerOnce: true });

  return (
    <section 
      ref={sectionRef}
      className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground"
    >
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 
          ref={titleRef}
          className={cn(
            "text-3xl lg:text-4xl font-extrabold tracking-tight opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTitleVisible && "opacity-100 translate-y-0"
          )}
        >
          Ready to Make Smarter Career Moves?
        </h2>
        <p 
          ref={textRef}
          className={cn(
            "mt-4 text-lg opacity-90 opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTextVisible && "opacity-100 translate-y-0 delay-200"
          )}
          style={{ transitionDelay: isTextVisible ? '200ms' : '0ms' }}
        >
          Join hyreSENSE today and experience the future of job searching and talent acquisition.
        </p>
        <form 
          ref={formRef}
          className={cn(
            "mt-10 max-w-md mx-auto sm:flex sm:gap-4 opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isFormVisible && "opacity-100 translate-y-0 delay-400"
          )}
          style={{ transitionDelay: isFormVisible ? '400ms' : '0ms' }}
        >
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <Input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            className="w-full px-5 py-3 placeholder-muted-foreground/70 focus:ring-white text-foreground" // text-foreground so input text is visible on gradient
            placeholder="Enter your email"
          />
          <Button
            type="submit"
            size="lg"
            className="mt-3 w-full sm:mt-0 sm:w-auto sm:flex-shrink-0 bg-primary-foreground text-primary hover:bg-primary-foreground/90 group"
          >
            Get Early Access
             <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
        <p 
          ref={subtextRef}
          className={cn(
            "mt-6 text-sm opacity-80 opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isSubtextVisible && "opacity-100 translate-y-0 delay-600"
          )}
          style={{ transitionDelay: isSubtextVisible ? '600ms' : '0ms' }}
        >
          Sign up now to be among the first to get access.
        </p>
      </div>
    </section>
  );
}
