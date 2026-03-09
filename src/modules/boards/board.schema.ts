/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';
import z from 'zod';

import { ZodObjectId } from '~/utils/validate.util';

export const BOARD_TYPE = {
  PUBLIC: '001',
  PRIVATE: '002',
} as const;

// Base Schema
export const boardSchema = z.object({
  _id: z.instanceof(ObjectId, { error: 'Your string fails to match the Object ID pattern' }),
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1, 'Must is required'),
  description: z.string().max(1000, 'Description too long').optional().default(''),
  type: z
    .enum(Object.values(BOARD_TYPE), `Must be one of: ${Object.values(BOARD_TYPE).join(', ')}`)
    .default(BOARD_TYPE.PUBLIC),
  columnOrderIds: z
    .array(z.instanceof(ObjectId, { error: 'Your string fails to match the Object ID pattern' }))
    .default([]),
  _destroy: z.boolean().default(false),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().nullable().default(null),
});

export const boardDTOSchema = z.object({
  ...boardSchema.omit({ _id: true }).shape,
  id: ZodObjectId,
  columnOrderIds: z.array(ZodObjectId).default([]),
});

// ==== Request Schemas ====
export const boardRequestSchema = {
  create: z.object({
    body: z.object({}),
  }),
  delete: z.object({
    params: z.object({}),
  }),
  update: z.object({
    body: z.object({}),
    params: z.object({}),
  }),
};

// ==== Inferred Types ====
// Controller layer
export type BoardDTO = z.infer<typeof boardDTOSchema>;

// Service layer
export type Board = z.infer<typeof boardDTOSchema>;
// Repo layer
export type BoardDocument = z.infer<typeof boardSchema>;
