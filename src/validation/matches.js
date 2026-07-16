import { z } from 'zod';

export const MATCH_STATUS = {
  SCHEDULED: 'scheduled',
  LIVE: 'live',
  FINISHED: 'finished',
};

const isIsoDateString = (value) => {
  const date = new Date(value);

  return !Number.isNaN(date.getTime()) && date.toISOString() === value;
};

export const listMatchesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(100).optional(),
});

export const matchIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const createMatchSchema = z
  .object({
    sport: z.string().trim().min(1),
    homeTeam: z.string().trim().min(1),
    awayTeam: z.string().trim().min(1),
    startTime: z.string().refine(isIsoDateString, {
      message: 'startTime must be a valid ISO date string',
    }),
    endTime: z.string().refine(isIsoDateString, {
      message: 'endTime must be a valid ISO date string',
    }),
    homeScore: z.coerce.number().int().nonnegative().optional(),
    awayScore: z.coerce.number().int().nonnegative().optional(),
  })
  .superRefine((data, context) => {
    if (new Date(data.endTime) <= new Date(data.startTime)) {
      context.addIssue({
        code: 'custom',
        path: ['endTime'],
        message: 'endTime must be chronologically after startTime',
      });
    }
  });

export const updateScoreSchema = z.object({
  homeScore: z.coerce.number().int().nonnegative(),
  awayScore: z.coerce.number().int().nonnegative(),
});
