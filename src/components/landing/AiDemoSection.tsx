
'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Lightbulb, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { analyzeSkillGap, type SkillGapAnalyzerInput, type SkillGapAnalyzerOutput } from '@/ai/flows/skill-gap-analyzer';
import { Badge } from '@/components/ui/badge';

export function AiDemoSection() {
  const [sectionRef, isSectionVisible] = useScrollAnimation<HTMLElement>({ threshold: 0.1, triggerOnce: true });
  const [titleRef, isTitleVisible] = useScrollAnimation<HTMLHeadingElement>({ threshold: 0.2, triggerOnce: true });
  const [formCardRef, isFormCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });
  const [resultsCardRef, isResultsCardVisible] = useScrollAnimation<HTMLDivElement>({ threshold: 0.2, triggerOnce: true });

  const [jobSeekerProfile, setJobSeekerProfile] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<SkillGapAnalyzerOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const input: SkillGapAnalyzerInput = {
        jobSeekerProfile,
        jobDescription,
      };
      const result = await analyzeSkillGap(input);
      setAnalysisResult(result);
    } catch (err) {
      console.error("Skill gap analysis error:", err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="ai-demo"
      className="py-16 sm:py-24 bg-background"
    >
      <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={cn(
            "text-center mb-12 opacity-0 translate-y-10 transition-all duration-700 ease-out",
            isTitleVisible && "opacity-100 translate-y-0"
          )}
        >
          <h2 className="text-base font-semibold text-primary tracking-wide uppercase">
            Experience the AI
          </h2>
          <p className="mt-2 text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
            AI-Powered Skill <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Boost Demo</span>
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            See how HyreSence AI helps you identify skill gaps and suggests learning resources. Fill in the fields below!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div
            ref={formCardRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out",
              isFormCardVisible && "opacity-100 translate-y-0 delay-200"
            )}
            style={{ transitionDelay: isFormCardVisible ? '200ms' : '0ms' }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Lightbulb className="h-7 w-7 text-primary" />
                  Analyze Your Skill Gap
                </CardTitle>
                <CardDescription>
                  Enter a brief summary of your skills/experience and a target job description.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobSeekerProfile">Your Profile / Current Skills</Label>
                    <Textarea
                      id="jobSeekerProfile"
                      placeholder="e.g., Experienced in JavaScript, React, Node.js. Worked on e-commerce platforms."
                      value={jobSeekerProfile}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJobSeekerProfile(e.target.value)}
                      rows={4}
                      required
                      className="resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="jobDescription">Target Job Description</Label>
                    <Textarea
                      id="jobDescription"
                      placeholder="e.g., Seeking a Senior Full-Stack Developer proficient in Python, Django, and AWS. Responsibilities include leading project development and mentoring junior developers."
                      value={jobDescription}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setJobDescription(e.target.value)}
                      rows={6}
                      required
                      className="resize-none"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Analyze Skills
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div
            ref={resultsCardRef}
            className={cn(
              "opacity-0 translate-y-10 transition-all duration-700 ease-out md:sticky md:top-24", // Sticky for results on larger screens
              isResultsCardVisible && "opacity-100 translate-y-0 delay-400"
            )}
            style={{ transitionDelay: isResultsCardVisible ? '400ms' : '0ms' }}
          >
            <Card className="shadow-xl min-h-[300px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <BookOpen className="h-7 w-7 text-accent" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>
                  {isLoading ? "Our AI is thinking..." : (analysisResult || error) ? "Here's what our AI suggests:" : "Results will appear here once you analyze."}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-lg">Generating personalized insights...</p>
                  </div>
                )}
                {error && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-5 w-5" />
                    <AlertTitle>Analysis Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {analysisResult && !isLoading && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Skills to Learn:</h3>
                      {analysisResult.suggestedSkills && analysisResult.suggestedSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.suggestedSkills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted-foreground">No specific new skills suggested based on the input. You might be a great fit already!</p>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Suggested Resource:</h3>
                      {analysisResult.suggestedResource ? (
                        <p className="text-primary font-medium underline cursor-pointer hover:opacity-80">
                            {analysisResult.suggestedResource}
                        </p>
                      ) : (
                        <p className="text-muted-foreground">No specific resource suggested at this time.</p>
                      )}
                    </div>
                  </div>
                )}
                {!isLoading && !analysisResult && !error && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-8">
                        <Lightbulb className="h-16 w-16 text-primary/30 mb-4" />
                        <p className="text-lg">Unlock your potential!</p>
                        <p>Enter your details and let our AI guide your career growth.</p>
                    </div>
                )}
              </CardContent>
              {analysisResult && !isLoading && (
                <CardFooter>
                    <p className="text-xs text-muted-foreground text-center w-full">
                        AI suggestions are for guidance only. Your unique experience and passion are key!
                    </p>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
