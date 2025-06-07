// As an employer, I want to use AI to rank candidates based on skills, experience, and cultural fit, so I can quickly identify top prospects.

'use server';

/**
 * @fileOverview Ranks candidates based on skills, experience, and cultural fit.
 *
 * - rankCandidates - A function that ranks candidates.
 * - CandidateRankerInput - The input type for the rankCandidates function.
 * - CandidateRankerOutput - The return type for the rankCandidates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CandidateRankerInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The description of the job, including required skills, experience, and cultural values.'),
  candidateProfiles: z.array(z.string()).describe('An array of candidate profiles, including skills, experience, and cultural fit information.'),
});
export type CandidateRankerInput = z.infer<typeof CandidateRankerInputSchema>;

const CandidateRankerOutputSchema = z.array(
  z.object({
    candidateProfile: z.string().describe('The candidate profile.'),
    rank: z.number().describe('The rank of the candidate, with 1 being the highest rank.'),
    reason: z.string().describe('The reason for the candidate ranking.'),
  })
);
export type CandidateRankerOutput = z.infer<typeof CandidateRankerOutputSchema>;

export async function rankCandidates(input: CandidateRankerInput): Promise<CandidateRankerOutput> {
  return rankCandidatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'candidateRankerPrompt',
  input: {schema: CandidateRankerInputSchema},
  output: {schema: CandidateRankerOutputSchema},
  prompt: `You are an AI hiring assistant that ranks candidates based on their skills, experience, and cultural fit for a given job.

  Job Description: {{{jobDescription}}}

  Candidate Profiles:
  {{#each candidateProfiles}}
  - {{{this}}}
  {{/each}}

  Rank the candidates based on the job description, with 1 being the highest rank. Provide a reason for each candidate's ranking.
  Return the results in JSON format.
  `,
});

const rankCandidatesFlow = ai.defineFlow(
  {
    name: 'rankCandidatesFlow',
    inputSchema: CandidateRankerInputSchema,
    outputSchema: CandidateRankerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
