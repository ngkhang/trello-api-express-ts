/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';
import * as z from 'zod';

import { BOARD_TYPE } from '~/modules/boards/board.type';
import { ZodEmptyObject, ZodObjectId } from '~/utils/validate.util';

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
  getById: z.object({
    body: ZodEmptyObject,
    params: boardDTOSchema.pick({ id: true }),
    query: ZodEmptyObject,
  }),
  create: z.object({
    body: boardDTOSchema.pick({ title: true, description: true, type: true }).partial({
      description: true,
      type: true,
    }),
    params: ZodEmptyObject,
    query: ZodEmptyObject,
  }),
  delete: z.object({
    body: ZodEmptyObject,
    params: boardDTOSchema.pick({ id: true }),
    query: ZodEmptyObject,
  }),
  update: z.object({
    body: boardDTOSchema
      .pick({ title: true, type: true, description: true, columnOrderIds: true })
      .partial(),
    params: boardDTOSchema.pick({ id: true }),
    query: ZodEmptyObject,
  }),
};
