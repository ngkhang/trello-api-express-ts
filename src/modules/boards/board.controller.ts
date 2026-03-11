/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import type { Request, Response, NextFunction } from 'express';

import { CreatedResponse, OkResponse } from '~/core/responses/api-success.response';
import { BoardService } from '~/modules/boards/board.service';
import type {
  BoardDTO,
  BoardResponseDTO,
  BoardsResponseDTO,
  CreateBoardDTO,
  DeleteBoardParamDTO,
  UpdateBoardBodyDTO,
  UpdateBoardParamDTO,
} from '~/modules/boards/board.type';

export class BoardController {
  private readonly boardService = new BoardService();

  public getAll = async (
    _req: Request,
    res: Response<OkResponse<BoardsResponseDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const result = await this.boardService.getAll();
    const resBody = new OkResponse({ data: result });
    res.status(resBody.statusCode).json(resBody);
  };

  public getById = async (
    req: Request<{ id: BoardDTO['id'] }, unknown, unknown>,
    res: Response<OkResponse<BoardResponseDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const board = await this.boardService.getById(req.params.id);

    const resBody = new OkResponse<BoardDTO>({ data: board });
    res.status(resBody.statusCode).json(resBody);
  };

  public create = async (
    req: Request<unknown, unknown, CreateBoardDTO>,
    res: Response<CreatedResponse<BoardResponseDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const createdBoard = await this.boardService.create(req.body);

    const resBody = new CreatedResponse({
      data: createdBoard,
      message: 'Board created successfully',
    });
    res.status(resBody.statusCode).json(resBody);
  };

  public update = async (
    req: Request<UpdateBoardParamDTO, unknown, UpdateBoardBodyDTO>,
    res: Response<OkResponse<BoardResponseDTO>>,
    _next: NextFunction,
  ): Promise<void> => {
    const updatedBoard = await this.boardService.update(req.params.id, req.body);
    const resBody = new OkResponse({ data: updatedBoard, message: 'Board updated successfully' });
    res.status(resBody.statusCode).json(resBody);
  };

  public delete = async (
    req: Request<DeleteBoardParamDTO>,
    res: Response<OkResponse<null>>,
    _next: NextFunction,
  ): Promise<void> => {
    await this.boardService.delete(req.params.id);

    const resBody = new OkResponse({ data: null, message: 'Board deleted successfully' });
    res.status(resBody.statusCode).json(resBody);
  };
}
