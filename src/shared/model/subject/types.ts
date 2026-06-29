import { SubjectSchema, SubjectTypeSchema } from '@/shared/model/subject/schema';
import { z } from 'zod';

export type Subject = z.infer<typeof SubjectSchema>;
export type SubjectType = z.infer<typeof SubjectTypeSchema>;
