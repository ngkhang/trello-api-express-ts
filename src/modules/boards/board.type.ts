/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type * as z from 'zod';

import type { boardDTOSchema, boardRequestSchema } from '~/modules/boards/board.schema';

export const BOARD_TYPE = {
  PUBLIC: '001',
  PRIVATE: '002',
} as const;

// Domain types
export type Board = z.infer<typeof boardDTOSchema>;
export type CreateBoard = Pick<Board, 'title' | 'slug' | 'type' | 'description'>;
export type UpdateBoard = Partial<
  Pick<Board, 'title' | 'slug' | 'type' | 'columnOrderIds' | 'description'>
>;

// DTOs
export type BoardDTO = z.infer<typeof boardDTOSchema>;
// TODO: BoardResponseDTO can hide properties (strips internal fields)
export type BoardResponseDTO = BoardDTO;
export type CreateBoardDTO = z.infer<typeof boardRequestSchema.create>['body'];
export type UpdateBoardBodyDTO = z.infer<typeof boardRequestSchema.update>['body'];
export type UpdateBoardParamDTO = z.infer<typeof boardRequestSchema.update>['params'];
export type DeleteBoardParamDTO = z.infer<typeof boardRequestSchema.getById>['params'];

export interface BoardsResponseDTO {
  items: BoardResponseDTO[];
  pagination: {
    total: number;
  };
}
