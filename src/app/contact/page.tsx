
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { Mail, MapPin, Phone, Send, Linkedin, Twitter, Instagram, MessageSquare, Building, Info } from 'lucide-react';
import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
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

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // Placeholder for actual form submission logic
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    reset(); // Reset form fields after submission
  };

  const [heroTitleRef, isHeroTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [heroSubtitleRef, isHeroSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();
  const [contactDetailsCardRef, isContactDetailsCardVisible] = useScrollAnimation<HTMLDivElement>();
  const [contactFormCardRef, isContactFormCardRefVisible] = useScrollAnimation<HTMLDivElement>();
  const [faqTitleRef, isFaqTitleVisible] = useScrollAnimation<HTMLHeadingElement>();
  const [faqSubtitleRef, isFaqSubtitleVisible] = useScrollAnimation<HTMLParagraphElement>();

  const contactReasons = [
    { icon: <MessageSquare className="h-8 w-8 text-accent" />, title: "General Inquiries", description: "Have a question about HyreSense? We're here to help." },
    { icon: <Building className="h-8 w-8 text-accent" />, title: "Partnership Opportunities", description: "Interested in collaborating with us? Let's talk." },
    { icon: <Info className="h-8 w-8 text-accent" />, title: "Support & Feedback", description: "Need assistance or have suggestions? We value your input." },
  ];


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
                    Feel free to reach out via email or connect with us on social media.
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
                    icon={<MapPin className="h-6 w-6" />}
                    title="Our Office"
                    value="Shaheed Nagar, Shaheed Path- Lucknow 226025"
                    delay={200}
                  />
                  <ContactInfoItem
                    icon={<Phone className="h-6 w-6" />}
                    title="Call Us"
                    value="+91-9667436171"
                    delay={300}
                  />
                  <div className="pt-4">
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
                isContactFormCardRefVisible && "opacity-100 translate-y-0 delay-400"
              )}
              style={{ transitionDelay: isContactFormCardRefVisible ? '400ms' : '0ms' }}
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
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="e.g., Jane Doe"
                        {...register("name")}
                        className={cn("mt-1.5", errors.name ? "border-destructive focus-visible:ring-destructive" : "")}
                      />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g., you@example.com"
                        {...register("email")}
                        className={cn("mt-1.5", errors.email ? "border-destructive focus-visible:ring-destructive" : "")}
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
                        className={cn("mt-1.5", errors.subject ? "border-destructive focus-visible:ring-destructive" : "")}
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
                    <Button type="submit" size="lg" className="w-full group">
                      Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-16 sm:py-24 bg-secondary/30 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2
              ref={faqTitleRef}
              className={cn(
                "text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isFaqTitleVisible && "opacity-100 translate-y-0"
              )}
            >
              How Can We <span className="text-primary">Assist You</span>?
            </h2>
            <p
              ref={faqSubtitleRef}
              className={cn(
                "mt-4 text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 translate-y-10 transition-all duration-700 ease-out",
                isFaqSubtitleVisible && "opacity-100 translate-y-0 delay-200"
              )}
              style={{ transitionDelay: isFaqSubtitleVisible ? '200ms' : '0ms' }}
            >
              We're eager to connect and explore how HyreSense can support your goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactReasons.map((reason, index) => {
              const [reasonCardRef, isReasonCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.1, triggerOnce: true });
              return (
                <div
                  key={reason.title}
                  ref={reasonCardRef}
                  className={cn(
                    "opacity-0 translate-y-10 transition-all duration-500 ease-out",
                    isReasonCardVisible && "opacity-100 translate-y-0"
                  )}
                  style={{ transitionDelay: isReasonCardVisible ? `${index * 150}ms` : '0ms' }}
                >
                  <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300 h-full bg-card hover:border-accent border-2 border-transparent p-4">
                    <CardHeader className="items-center p-2">
                      <div className="p-4 bg-accent/10 rounded-full inline-block mb-3">
                        {reason.icon}
                      </div>
                      <CardTitle className="text-xl">{reason.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <p className="text-muted-foreground text-sm">{reason.description}</p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
