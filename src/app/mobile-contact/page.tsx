
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { Phone, Mail, Clock, Send, Info } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function MobileContactPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log('Mobile contact form submitted:', data);
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you soon.",
    });
    reset();
  };

  return (
    <MobileAppLayout activeView="ai_assist"> {/* activeView prop may need adjustment based on actual navigation logic */}
      <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-900/30">
        <div className="p-4 space-y-6">
          <Card className="shadow-xl border-border/30 rounded-xl overflow-hidden bg-card/90 backdrop-blur-md">
            <CardHeader className="items-center text-center p-4 pb-2">
               <div className="p-3 bg-primary/10 rounded-full inline-block mb-2 ring-2 ring-primary/20">
                 <Info className="h-8 w-8 text-primary" />
               </div>
              <CardTitle className="text-xl font-bold text-foreground">Get in Touch</CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                We're here to help. Choose your preferred way to connect.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Call Us Card */}
          <Card className="shadow-lg border-border/30 rounded-xl overflow-hidden bg-card/85 backdrop-blur-sm transform transition-all duration-300 hover:shadow-primary/20 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center gap-3 p-4">
              <Phone className="h-7 w-7 text-primary flex-shrink-0" />
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">Call Us Directly</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">Speak with our team.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-center">
              <a
                href="tel:+919667436171"
                className="block text-lg font-semibold text-primary hover:text-accent transition-colors mb-2"
              >
                +91-9667436171
              </a>
              <div className="flex items-center justify-center text-xs text-muted-foreground gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Available: 10 AM - 6 PM (Mon-Fri)</span>
              </div>
              <Button asChild size="sm" className="w-full mt-4 h-10 text-sm group">
                <a href="tel:+919667436171">
                  <Phone className="mr-2 h-4 w-4 group-hover:animate-pulse" /> Call Now
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Message Us Card */}
          <Card className="shadow-lg border-border/30 rounded-xl overflow-hidden bg-card/85 backdrop-blur-sm  transform transition-all duration-300 hover:shadow-accent/20 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center gap-3 p-4">
              <Mail className="h-7 w-7 text-accent flex-shrink-0" />
               <div>
                <CardTitle className="text-lg font-semibold text-foreground">Send Us a Message</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">We'll get back to you shortly.</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label htmlFor="mobile-name" className="text-xs">Full Name</Label>
                  <Input
                    id="mobile-name"
                    {...register("name")}
                    placeholder="Your Name"
                    className={cn("mt-1 h-9 text-sm bg-background/70 dark:bg-slate-700/50", errors.name && "border-destructive")}
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="mobile-email" className="text-xs">Email</Label>
                  <Input
                    id="mobile-email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className={cn("mt-1 h-9 text-sm bg-background/70 dark:bg-slate-700/50", errors.email && "border-destructive")}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="mobile-subject" className="text-xs">Subject</Label>
                  <Input
                    id="mobile-subject"
                    {...register("subject")}
                    placeholder="Inquiry about..."
                    className={cn("mt-1 h-9 text-sm bg-background/70 dark:bg-slate-700/50", errors.subject && "border-destructive")}
                  />
                  {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <Label htmlFor="mobile-message" className="text-xs">Message</Label>
                  <Textarea
                    id="mobile-message"
                    {...register("message")}
                    placeholder="Your message..."
                    rows={4}
                    className={cn("mt-1 text-sm resize-none bg-background/70 dark:bg-slate-700/50", errors.message && "border-destructive")}
                  />
                  {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <Button type="submit" size="sm" className="w-full h-10 text-sm group bg-accent hover:bg-accent/90 text-accent-foreground">
                  Send Message <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </MobileAppLayout>
  );
}
