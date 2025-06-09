
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

export function CtaSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
          Ready to Make Smarter Career Moves?
        </h2>
        <p className="mt-4 text-lg opacity-90">
          Join hyreSENSE today and experience the future of job searching and talent acquisition.
        </p>
        <form className="mt-10 max-w-md mx-auto sm:flex sm:gap-4">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <Input
            type="email"
            name="email-address"
            id="email-address"
            autoComplete="email"
            required
            className="w-full px-5 py-3 placeholder-muted-foreground/70 focus:ring-white text-foreground"
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
        <p className="mt-6 text-sm opacity-80">
          Sign up now to be among the first to get access.
        </p>
      </div>
    </section>
  );
}
