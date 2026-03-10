/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-10
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import { CreatedResponse, OkResponse } from '~/core/responses/api-success.response';
import type {
  BoardDTO,
  CreateBoardDTO,
  UpdateBoardBodyDTO,
  UpdateBoardParamsDTO,
} from '~/modules/boards/board.schema';
import { BoardService } from '~/modules/boards/board.service';

export class BoardController {
  private readonly boardService = new BoardService();

  public list = async (
    _req: Request,
    res: Response<OkResponse<{ items: BoardDTO[]; pagination: { total: number } }>>,
    _next: NextFunction,
  ): Promise<void> => {
    const result = await this.boardService.list();

    const resBody = new OkResponse({
      data: {
        items: result.items,
        pagination: {
          total: result.total,
        },
      },
    });
    res.status(resBody.statusCode).json(resBody);
  };

  public getById = async (
    req: Request<{ id: BoardDTO['id'] }, object, object>,
    res: Response<OkResponse<BoardDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const board = await this.boardService.getById(req.params.id);

    const resBody = new OkResponse<BoardDTO>({ data: board });
    res.status(resBody.statusCode).json(resBody);
  };

  public create = async (
    req: Request<object, object, CreateBoardDTO>,
    res: Response<CreatedResponse<BoardDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const input = req.body;
    const createdBoard = await this.boardService.create(input);

    const resBody = new CreatedResponse({
      data: createdBoard,
      message: 'Created a new board successfully',
    });
    res.status(resBody.statusCode).json(resBody);
  };

  public update = async (
    req: Request<UpdateBoardParamsDTO, object, UpdateBoardBodyDTO>,
    res: Response<OkResponse<BoardDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const updated = await this.boardService.update(req.params.id, req.body);
    const resBody = new OkResponse({ data: updated, message: 'Board updated successfully' });
    res.status(resBody.statusCode).json(resBody);
  };

  public delete = async (
    req: Request<UpdateBoardParamsDTO>,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    await this.boardService.delete(req.params.id);

    const resBody = new OkResponse<null>({ data: null, message: 'Board deleted successfully' });
    res.status(resBody.statusCode).json(resBody);
  };
}
