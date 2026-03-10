/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-10
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';
import * as z from 'zod';

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
  id: z.object({
    params: boardDTOSchema.pick({ id: true }),
  }),
  create: z.object({
    body: boardDTOSchema.pick({ title: true, description: true, type: true }).partial({
      description: true,
      type: true,
    }),
  }),
  delete: z.object({
    params: boardDTOSchema.pick({ id: true }),
  }),
  update: z.object({
    body: boardDTOSchema
      .pick({ type: true, description: true, _destroy: true, columnOrderIds: true })
      .partial(),
    params: boardDTOSchema.pick({ id: true }),
  }),
};

// ==== Inferred Types ====
export type BoardDocument = z.infer<typeof boardSchema>;
export type Board = z.infer<typeof boardDTOSchema>;
export type CreateBoard = Pick<Board, 'title' | 'slug' | 'type' | 'description'>;
export type UpdateBoard = Partial<Omit<Board, 'id' | 'title' | 'slug' | 'createdAt' | 'updatedAt'>>;
export type BoardDTO = Board; // TODO: strips internal fields
export type CreateBoardDTO = z.infer<typeof boardRequestSchema.create>['body'];
export type UpdateBoardBodyDTO = z.infer<typeof boardRequestSchema.update>['body'];
export type UpdateBoardParamsDTO = z.infer<typeof boardRequestSchema.update>['params'];
