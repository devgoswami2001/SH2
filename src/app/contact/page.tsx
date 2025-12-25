
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram, Building, Info, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const contactFormSchema = z.object({
  full_name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  value: string | React.ReactNode; 
  href?: string;
  delay?: number;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon, title, value, href, delay = 0 }) => {
  const [itemRef, isItemVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const content = href ? (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors break-all">
      {value}
    </Link>
  ) : (
    <span className="break-all">{value}</span>
  );

  return (
    <div
      ref={itemRef}
      className={cn(
        "flex items-start gap-4 opacity-0 translate-y-5 transition-all duration-500 ease-out",
        isItemVisible && "opacity-100 translate-y-0"
      )}
      style={{ transitionDelay: isItemVisible ? `${delay}ms` : '0ms' }}
    >
      <span className="flex-shrink-0 mt-1 text-primary">{icon}</span>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  );
};


export default function ContactUsPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://backend.hyresense.com/api/v1/contact/send-message/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send message.');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon.",
      });
      reset();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [contactDetailsCardRef, isContactDetailsCardVisible] = useScrollAnimation<HTMLDivElement>();
  const [contactFormCardRef, isContactFormCardVisible] = useScrollAnimation<HTMLDivElement>();
  

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            ref={heroTitleRef}
            className={cn(
              "text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroTitleVisible && "opacity-100 translate-y-0"
            )}
          >
            Get in <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h1>
          <p
            ref={heroSubtitleRef}
            className={cn(
              "mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isHeroSubtitleVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isHeroSubtitleVisible ? '200ms' : '0ms' }}
          >
            We're here to answer any questions you may have about HyreSense. Reach out to us and we'll respond as soon as we can.
          </p>
        </div>
      </section>

      {/* Contact Details and Form Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Details Column */}
            <div
              ref={contactDetailsCardRef}
              className={cn(
                "lg:col-span-2 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isContactDetailsCardVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isContactDetailsCardVisible ? '200ms' : '0ms' }}
            >
              <Card className="shadow-xl border-l-4 border-primary p-6 h-full bg-card/90 backdrop-blur-md">
                <CardHeader className="p-0 pb-6">
                  <CardTitle className="text-2xl text-primary">Contact Information</CardTitle>
                  <CardDescription>
                    Feel free to reach out via email, phone, or connect on social media.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 space-y-6">
                  <ContactInfoItem
                    icon={<Mail className="h-6 w-6" />}
                    title="Email Us"
                    value="connect@hyresense.com"
                    href="mailto:connect@hyresense.com"
                    delay={100}
                  />
                  <ContactInfoItem
                    icon={<Phone className="h-6 w-6" />}
                    title="Call Us"
                    value="+91-9667436171" 
                    href="tel:+919667436171"
                    delay={200}
                  />
                  <ContactInfoItem
                    icon={<MapPin className="h-6 w-6" />}
                    title="Our Office"
                    value="5th Floor, DLF Centre, Savitri Cinema Complex, Greater Kailash-II, New Delhi 110048"
                    delay={300}
                  />
                  <Separator />
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Building className="h-5 w-5 text-primary"/> Corporate Details</h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                        <p>A part of <strong className="text-foreground">MokshDan Solutions OPC Pvt Ltd</strong></p>
                        <p><strong>TAN:</strong> LKNM14341F</p>
                        <p><strong>PAN:</strong> AARCM7411P</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-semibold text-foreground mb-3">Follow Us:</h4>
                    <div className="flex space-x-4">
                      {[
                        { href: "#", icon: <Linkedin className="h-6 w-6" />, label: "LinkedIn", delay:400 },
                        { href: "#", icon: <Twitter className="h-6 w-6" />, label: "Twitter", delay: 500 },
                        { href: "#", icon: <Instagram className="h-6 w-6" />, label: "Instagram", delay: 600 },
                      ].map(social => {
                         const [socialRef, isSocialVisible] = useScrollAnimation<HTMLAnchorElement>({ threshold: 0.2, triggerOnce: true });
                         return (
                            <Link
                            key={social.label}
                            href={social.href}
                            ref={socialRef}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "text-muted-foreground hover:text-primary transition-all duration-500 ease-out opacity-0 translate-y-3",
                                isSocialVisible && "opacity-100 translate-y-0"
                            )}
                            style={{ transitionDelay: isSocialVisible ? `${social.delay}ms` : '0ms' }}
                            aria-label={social.label}
                            >
                            {social.icon}
                            </Link>
                         );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form Column */}
            <div
              ref={contactFormCardRef}
              className={cn(
                "lg:col-span-3 opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isContactFormCardVisible && "opacity-100 translate-y-0 delay-400"
              )}
              style={{ transitionDelay: isContactFormCardVisible ? '400ms' : '0ms' }}
            >
              <Card className="shadow-xl p-6 sm:p-8 bg-card/90 backdrop-blur-md border border-border/30">
                <CardHeader className="p-0 pb-6 text-center lg:text-left">
                  <CardTitle className="text-3xl font-semibold">Send Us a Message</CardTitle>
                  <CardDescription>
                    Have a specific question or proposal? Fill out the form below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div>
                      <Label htmlFor="full_name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="full_name"
                        type="text"
                        placeholder="e.g., Jane Doe"
                        {...register("full_name")}
                        className={cn("mt-1.5 h-11", errors.full_name ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {errors.full_name && <p className="mt-1 text-xs text-destructive">{errors.full_name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., you@example.com"
                        {...register("email")}
                        className={cn("mt-1.5 h-11", errors.email ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="e.g., Partnership Inquiry"
                        {...register("subject")}
                        className={cn("mt-1.5 h-11", errors.subject ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Your detailed message here..."
                        {...register("message")}
                        rows={5}
                        className={cn("mt-1.5 resize-none", errors.message ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                    </div>
                    <Button type="submit" size="lg" className="w-full group h-11 text-base" disabled={isLoading}>
                      {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
                      {isLoading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
