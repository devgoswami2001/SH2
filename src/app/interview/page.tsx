
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Brain, User, Video, Calendar, Star, Clock, AlertCircle, Loader2, PlusCircle, MessageSquareText } from 'lucide-react';
import { MobileAppLayout } from '@/components/layout/MobileAppLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface MockInterview {
    id: string;
    interview_type: 'technical' | 'behavioral' | 'general';
    interview_type_display: string;
    status: 'requested' | 'scheduled' | 'completed' | 'cancelled' | 'upcoming';
    status_display: string;
    date: string | null;
    time: string | null;
    expert_name: string;
    expert_designation: string;
    expert_company: string;
    meeting_link: string;
    rating: string | null;
    feedback: string;
    created_at: string;
}

const RequestInterviewForm: React.FC<{onSuccess: (newInterview: MockInterview) => void}> = ({ onSuccess }) => {
    const [interviewType, setInterviewType] = useState<'technical' | 'behavioral' | 'general'>('technical');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError("You must be logged in to make a request.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/mock-interviews/request/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    interview_type: interviewType,
                    notes: notes,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to request interview.');
            }
            
            const newInterview: MockInterview = await response.json();
            toast({
                title: 'Request Submitted!',
                description: `Your ${newInterview.interview_type_display} interview request has been sent.`,
            });
            onSuccess(newInterview);
            setIsOpen(false); // Close dialog on success
            setNotes(''); // Reset form
            setInterviewType('technical');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4"/> Request Expert Session
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request a Mock Interview</DialogTitle>
                    <DialogDescription>
                        Choose the type of interview and add any specific notes for the expert.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-4">
                     {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="space-y-2">
                        <Label>Interview Type</Label>
                        <RadioGroup value={interviewType} onValueChange={(value) => setInterviewType(value as any)} className="flex gap-4">
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="technical" id="r1"/>
                                <Label htmlFor="r1">Technical</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="behavioral" id="r2" />
                                <Label htmlFor="r2">Behavioral</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes for the Expert</Label>
                        <Textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="e.g., Need help with system design questions for a senior role..."
                            rows={4}
                        />
                    </div>
                     <DialogFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isLoading ? 'Submitting...' : 'Submit Request'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};


const InterviewPageContent = () => {
    const [interviews, setInterviews] = useState<MockInterview[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchInterviews = useCallback(async () => {
        setIsLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            setError("Please log in to view your interviews.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('https://backend.hyresense.com/api/v1/jobseeker/mock-interviews/my/', {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            if (!response.ok) throw new Error("Failed to fetch interviews.");
            
            const data = await response.json();
            setInterviews(data.results || []);

        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchInterviews();
    }, [fetchInterviews]);
    
    const handleRequestSuccess = (newInterview: MockInterview) => {
        setInterviews(prev => [newInterview, ...prev]);
    }

    const upcomingInterviews = interviews.filter(i => i.status === 'requested' || i.status === 'scheduled' || i.status === 'upcoming');
    const pastInterviews = interviews.filter(i => i.status === 'completed' || i.status === 'cancelled');

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

                <div className="grid md:grid-cols-1 gap-6">
                    <Card className="shadow-lg hover:shadow-accent/20 transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><User className="text-accent"/>Human Expert Session</CardTitle>
                            <CardDescription>Schedule a session with an industry veteran for in-depth coaching and personalized advice.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RequestInterviewForm onSuccess={handleRequestSuccess} />
                        </CardContent>
                    </Card>
                </div>

                {error && <Alert variant="destructive"><AlertCircle className="h-4 w-4"/><AlertTitle>Error</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

                {isLoading ? (
                     <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                ) : (
                    <>
                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2"><Calendar className="h-5 w-5 text-primary"/>Upcoming/Requested Interviews</h2>
                            <div className="space-y-4">
                                {upcomingInterviews.length > 0 ? (
                                    upcomingInterviews.map(interview => (
                                        <Card key={interview.id} className="shadow-md bg-card/90">
                                            <CardContent className="p-4 flex items-center gap-4">
                                                <div className="p-2 bg-muted rounded-full">
                                                    <Brain className="h-6 w-6 text-primary"/>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-foreground">{interview.interview_type_display}</p>
                                                    <p className="text-sm text-muted-foreground">Status: <span className="font-medium text-primary">{interview.status_display}</span></p>
                                                     {interview.date && interview.time ? (
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="h-3 w-3"/>{format(new Date(interview.date), 'PPP')} at {interview.time}</p>
                                                     ) : (
                                                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><Clock className="h-3 w-3"/>Requested on {format(new Date(interview.created_at), 'PPP')}</p>
                                                     )}
                                                </div>
                                                {(interview.status === 'scheduled' || interview.status === 'upcoming') && interview.meeting_link && (
                                                    <Button asChild size="sm">
                                                        <Link href={interview.meeting_link} target="_blank">Join Call</Link>
                                                    </Button>
                                                )}
                                            </CardContent>
                                        </Card>
                                    ))
                                ) : (
                                    <Alert>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>No Upcoming Interviews</AlertTitle>
                                        <AlertDescription>You don't have any interviews scheduled or requested. Request one above to get started!</AlertDescription>
                                    </Alert>
                                )}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2"><MessageSquareText className="h-5 w-5 text-primary"/>Interview History & Feedback</h2>
                            <div className="space-y-4">
                                {pastInterviews.length > 0 ? (
                                    pastInterviews.map(interview => (
                                        <Card key={interview.id} className="shadow-md bg-card/90">
                                            <CardHeader className="flex flex-row justify-between items-start pb-2">
                                                <div>
                                                    <p className="font-semibold text-foreground">{interview.interview_type_display}</p>
                                                    <p className="text-sm text-muted-foreground">{interview.expert_name}</p>
                                                </div>
                                                {interview.rating && (
                                                    <Badge variant="outline" className="flex items-center gap-1">
                                                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400"/> {parseFloat(interview.rating).toFixed(1)} / 5.0
                                                    </Badge>
                                                )}
                                            </CardHeader>
                                            <CardContent>
                                                {interview.feedback ? (
                                                    <p className="text-sm text-muted-foreground italic">"{interview.feedback}"</p>
                                                ) : (
                                                    <p className="text-sm text-muted-foreground italic">Feedback is pending from the expert.</p>
                                                )}
                                                <p className="text-xs text-muted-foreground/80 mt-2 text-right">Completed on {format(new Date(interview.created_at), 'PPP')}</p>
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
                    </>
                )}
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
