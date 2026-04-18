import { z } from 'zod';

export const hobbySchema = z.enum(['lys', 'smykker']);
export type Hobby = z.infer<typeof hobbySchema>;

export const postSaveSchema = z.object({
  id: z.string().uuid().optional(),
  hobby: hobbySchema,
  title: z.string().min(3, 'Tittel må være minst 3 tegn').max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, 'Kun små bokstaver, tall og bindestrek')
    .min(1)
    .max(80)
    .optional(),
  content: z.string().min(1, 'Innhold kan ikke være tomt'),
  excerpt: z.string().max(300).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal('')),
  published: z.boolean(),
});

export type PostSaveInput = z.infer<typeof postSaveSchema>;
