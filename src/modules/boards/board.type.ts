/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

// Domain types
import type * as z from 'zod';

import type { boardDTOSchema, boardRequestSchema } from '~/modules/boards/board.schema';

export const BOARD_TYPE = {
  PUBLIC: '001',
  PRIVATE: '002',
} as const;

export type Board = z.infer<typeof boardDTOSchema>;
export type CreateBoard = Pick<Board, 'title' | 'slug' | 'type' | 'description'>;
// export type CreateBoard = Pick<Board, 'title' | 'slug'> & Partial<Pick<Board, 'type' | 'description'>>
// TODO: Remove title and slug types in UpdateBoard when validate exist
export type UpdateBoard = Partial<Omit<Board, 'id' | 'title' | 'slug' | 'createdAt' | 'updatedAt'>>;

// DTOs
export type BoardDTO = z.infer<typeof boardDTOSchema>;
// TODO: BoardResponseDTO can hide properties (strips internal fields)
export type BoardResponseDTO = BoardDTO;
export type CreateBoardDTO = z.infer<typeof boardRequestSchema.create>['body'];
export type UpdateBoardBodyDTO = z.infer<typeof boardRequestSchema.update>['body'];
export type UpdateBoardParamDTO = z.infer<typeof boardRequestSchema.update>['params'];
export type DeleteBoardParamDTO = z.infer<typeof boardRequestSchema.id>['params'];

export interface BoardsResponseDTO {
  items: BoardResponseDTO[];
  // Separate Pagination type
  pagination: {
    total: number;
  };
}
