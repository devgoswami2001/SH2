'use server';

/**
 * @fileOverview AI-powered skill gap analyzer for job seekers.
 *
 * - analyzeSkillGap - A function that analyzes a job seeker's profile and suggests skills to learn.
 * - SkillGapAnalyzerInput - The input type for the analyzeSkillGap function.
 * - SkillGapAnalyzerOutput - The return type for the analyzeSkillGap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SkillGapAnalyzerInputSchema = z.object({
  jobSeekerProfile: z
    .string()
    .describe('The job seeker profile, including skills, experience, and education.'),
  jobDescription: z.string().describe('The job description for the desired role.'),
});

export type SkillGapAnalyzerInput = z.infer<typeof SkillGapAnalyzerInputSchema>;

const SkillGapAnalyzerOutputSchema = z.object({
  suggestedSkills: z
    .array(z.string())
    .describe('A list of skills the job seeker should learn.'),
  suggestedResource: z.string().describe('The best resource to learn the suggested skills.'),
});

export type SkillGapAnalyzerOutput = z.infer<typeof SkillGapAnalyzerOutputSchema>;

export async function analyzeSkillGap(input: SkillGapAnalyzerInput): Promise<SkillGapAnalyzerOutput> {
  return analyzeSkillGapFlow(input);
}

const prompt = ai.definePrompt({
  name: 'skillGapAnalyzerPrompt',
  input: {schema: SkillGapAnalyzerInputSchema},
  output: {schema: SkillGapAnalyzerOutputSchema},
  prompt: `You are an AI-powered career advisor. Analyze the job seeker's profile and the job description to identify skill gaps and suggest skills to learn, along with the best resource to learn them.

Job Seeker Profile: {{{jobSeekerProfile}}}
Job Description: {{{jobDescription}}}

Based on this information, suggest specific skills the job seeker should acquire to improve their chances of getting hired for the described role, along with the single best online resource (e.g. Coursera, Udemy, Codecademy) for learning these skills.

Skills to Learn:`, 
});

const analyzeSkillGapFlow = ai.defineFlow(
  {
    name: 'analyzeSkillGapFlow',
    inputSchema: SkillGapAnalyzerInputSchema,
    outputSchema: SkillGapAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
