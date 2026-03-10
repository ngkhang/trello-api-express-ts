/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-10
 ------------------------------------------------- */

import { BadRequestError, ConflictError, NotFoundError } from '~/core/responses/api-error.response';
import { BoardRepository } from '~/modules/boards/board.repository';
import {
  BOARD_TYPE,
  type Board,
  type BoardDTO,
  type CreateBoardDTO,
  type UpdateBoardBodyDTO,
  type UpdateBoardParamsDTO,
} from '~/modules/boards/board.schema';
import { slugify } from '~/utils/converts.util';

export class BoardService {
  private readonly boardRepo = new BoardRepository();

  public async list(): Promise<{ items: BoardDTO[]; total: number }> {
    const boards = await this.boardRepo.findMany();
    return {
      items: boards,
      total: boards.length,
    };
  }

  public async getById(id: Board['id']): Promise<BoardDTO> {
    const board = await this.boardRepo.findById(id);

    if (!board) throw new NotFoundError(`Not found board with ID: ${id}`);
    return board;
  }

  public async create(data: CreateBoardDTO): Promise<BoardDTO> {
    const existBoard = await this.boardRepo.existByTitle(data.title);

    if (existBoard) throw new ConflictError(`Board with title  '${data.title}' already exists`);

    return await this.boardRepo.create({
      title: data.title,
      slug: slugify(data.title),
      type: data.type || BOARD_TYPE.PUBLIC,
      description: data.description || '',
    });
  }

  public async update(id: UpdateBoardParamsDTO['id'], data: UpdateBoardBodyDTO): Promise<BoardDTO> {
    const existBoard = await this.getById(id);

    if (!existBoard) throw new NotFoundError(`Board with id '${id}' not found`);

    const updated = await this.boardRepo.update(id, data);

    if (!updated) throw new BadRequestError(`Can't update board data with ID: ${id}`);

    return updated;
  }

  public async delete(id: Board['id']): Promise<void> {
    await this.getById(id);
    await this.boardRepo.delete(id);
  }
}
