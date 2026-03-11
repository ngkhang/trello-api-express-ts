/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import { BadRequestError, ConflictError, NotFoundError } from '~/core/responses/api-error.response';
import { BoardRepository } from '~/modules/boards/board.repository';
import { BOARD_TYPE } from '~/modules/boards/board.type';
import type {
  Board,
  BoardResponseDTO,
  BoardsResponseDTO,
  CreateBoardDTO,
  DeleteBoardParamDTO,
  UpdateBoardBodyDTO,
  UpdateBoardParamDTO,
} from '~/modules/boards/board.type';
import { slugify } from '~/utils/converts.util';

export class BoardService {
  private readonly boardRepo = new BoardRepository();

  public async list(): Promise<BoardsResponseDTO> {
    const boards = await this.boardRepo.findMany();

    // TODO: Reformat pagination
    return {
      items: boards,
      pagination: {
        total: boards.length,
      },
    };
  }

  public async getById(id: Board['id']): Promise<BoardResponseDTO> {
    const board = await this.boardRepo.findById(id);

    if (!board) throw new NotFoundError(`Not found board with ID: ${id}`);
    return board;
  }

  public async create(data: CreateBoardDTO): Promise<BoardResponseDTO> {
    const existBoard = await this.boardRepo.existByTitle(data.title);

    if (existBoard) throw new ConflictError(`Board with title  '${data.title}' already exists`);

    const newBoardCreated = await this.boardRepo.create({
      title: data.title,
      slug: slugify(data.title),
      type: data.type || BOARD_TYPE.PUBLIC,
      description: data.description || '',
    });

    if (!newBoardCreated) throw new BadRequestError('Failed to retrieve created board');
    return newBoardCreated;
  }

  public async update(
    id: UpdateBoardParamDTO['id'],
    data: UpdateBoardBodyDTO,
  ): Promise<BoardResponseDTO> {
    const existBoard = await this.getById(id);

    if (!existBoard) throw new NotFoundError(`Board with id '${id}' not found`);

    // TODO: Check title and slug to update it
    const updated = await this.boardRepo.update(id, data);

    if (!updated) throw new BadRequestError(`Can't update board data with ID: ${id}`);
    return updated;
  }

  public async delete(id: DeleteBoardParamDTO['id']): Promise<void> {
    await this.getById(id);
    const isDelete = await this.boardRepo.delete(id);
    if (!isDelete) throw new BadRequestError('Failed to deleted board');
  }
}
