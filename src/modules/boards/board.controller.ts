/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import { OkResponse } from '~/core/responses/api-success.response';
import type { BoardDTO } from '~/modules/boards/board.schema';
import { BoardService } from '~/modules/boards/board.service';

export class BoardController {
  private readonly boardService = new BoardService();

  public getById = async (req: Request, res: Response, _next: NextFunction) => {
    const id = req.params.id as unknown as BoardDTO['id'];
    const board = await this.boardService.getById(id);

    const resBody = new OkResponse<BoardDTO>({ data: board });
    res.status(resBody.statusCode).json(resBody);
  };
}
