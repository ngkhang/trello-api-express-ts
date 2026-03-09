/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { NotFoundError } from '~/core/responses/api-error.response';
import { BoardRepository } from '~/modules/boards/board.repository';
import type { Board, BoardDTO } from '~/modules/boards/board.schema';

export class BoardService {
  private readonly boardRepo = new BoardRepository();

  public async getById(id: Board['id']): Promise<BoardDTO> {
    const board = await this.boardRepo.findById(id);

    if (!board) throw new NotFoundError(`Not found board with ID: ${id}`);
    return board;
  }
}
