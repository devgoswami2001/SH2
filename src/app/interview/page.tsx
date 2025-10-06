
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Brain, User, Video, Calendar, MessageSquareText, Star, Clock, AlertCircle } from 'lucide-react';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

const InterviewPageContent = () => {
  const upcomingInterviews = [
    {
      id: 'upcoming2',
      type: 'Human Expert Interview',
      topic: 'Behavioral & Situational',
      date: 'Sep 15, 2025, 2:30 PM',
      icon: User,
      link: '#',
    },
  ];

  const pastInterviews = [
     {
      id: 'past1',
      type: 'Human Expert Interview',
      topic: 'Data Structures',
      date: 'Aug 28, 2025',
      rating: 4.5,
      feedback: 'Good problem-solving approach. Pace was a bit slow on the second question. Focus on optimizing time complexity.',
    },
  ];

  return (
    <ScrollArea className="flex-grow bg-muted/20 dark:bg-slate-900/30">
        <div className="p-4 md:p-8 space-y-8">
             <Card className="shadow-xl border-border/40 rounded-xl bg-card/80 backdrop-blur-md overflow-hidden">
                <CardHeader className="text-center">
                    <Video className="mx-auto h-12 w-12 text-primary mb-2" />
                    <CardTitle className="text-2xl md:text-3xl font-bold">Mock Interviews</CardTitle>
                    <CardDescription>Sharpen your skills and build confidence for your next real interview.</CardDescription>
                </CardHeader>
            </Card>

            {/* Request Interview Section */}
            <div className="grid md:grid-cols-1 gap-6">
                 <Card className="shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="text-accent"/>Human Expert Session</CardTitle>
                        <CardDescription>Schedule a session with an industry veteran for in-depth coaching and personalized advice.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full" variant="outline" onClick={() => alert('Requesting Human Interview...')}>Request Expert Session</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Upcoming Interviews Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/>Upcoming Interviews</h2>
                <div className="space-y-4">
                    {upcomingInterviews.length > 0 ? (
                        upcomingInterviews.map(interview => (
                            <Card key={interview.id} className="shadow-md bg-card/90">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-full">
                                        <interview.icon className="h-6 w-6 text-primary"/>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-foreground">{interview.type}</p>
                                        <p className="text-sm text-muted-foreground">{interview.topic}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="h-3 w-3"/>{interview.date}</p>
                                    </div>
                                    <Button asChild size="sm">
                                        <Link href={interview.link}>Join Call</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                         <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>No Upcoming Interviews</AlertTitle>
                            <AlertDescription>You don't have any interviews scheduled. Request one above to get started!</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>

            {/* Past Interviews Section */}
            <div>
                 <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2"><MessageSquareText className="h-5 w-5 text-primary"/>Interview Feedback</h2>
                 <div className="space-y-4">
                    {pastInterviews.length > 0 ? (
                         pastInterviews.map(interview => (
                            <Card key={interview.id} className="shadow-md bg-card/90">
                                <CardHeader className="flex flex-row justify-between items-start pb-2">
                                    <div>
                                        <p className="font-semibold text-foreground">{interview.type}</p>
                                        <p className="text-sm text-muted-foreground">{interview.topic}</p>
                                    </div>
                                     <Badge variant="outline" className="flex items-center gap-1">
                                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400"/> {interview.rating} / 5.0
                                    </Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground italic">"{interview.feedback}"</p>
                                    <p className="text-xs text-muted-foreground/80 mt-2 text-right">Completed on {interview.date}</p>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                         <Alert>
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>No Past Interviews</AlertTitle>
                            <AlertDescription>Your feedback from completed interviews will appear here.</AlertDescription>
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    </ScrollArea>
  );
};


export default function InterviewPage() {
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileAppLayout activeView="interview" pageTitle="Interviews">
            <InterviewPageContent />
        </MobileAppLayout>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-col h-screen bg-background">
        <AppHeader />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <InterviewPageContent />
          </div>
        </main>
      </div>
    </>
  );
}
