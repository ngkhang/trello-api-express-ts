/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import { BadRequestError, ConflictError, NotFoundError } from '~/core/responses/api-error.response';
import { BoardRepository } from '~/modules/boards/board.repository';
import { BOARD_TYPE } from '~/modules/boards/board.type';
import type {
  Board,
  UpdateBoard,
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

  public async getAll(): Promise<BoardsResponseDTO> {
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
    const existBoard = await this.boardRepo.isTitleTaken(data.title);

    if (existBoard) throw new ConflictError('A board with this title already exists');

    const newBoardCreated = await this.boardRepo.create({
      title: data.title,
      slug: slugify(data.title),
      type: data.type || BOARD_TYPE.PUBLIC,
      description: data.description || '',
    });

    if (!newBoardCreated) throw new BadRequestError('Board creation failed');
    return newBoardCreated;
  }

  public async update(
    id: UpdateBoardParamDTO['id'],
    data: UpdateBoardBodyDTO,
  ): Promise<BoardResponseDTO> {
    const existBoard = await this.getById(id);

    const { title, columnOrderIds, ...rest } = data;
    const newBoardUpdate: UpdateBoard = {
      title: existBoard.title,
      slug: existBoard.slug,
      description: existBoard.description,
      type: existBoard.type,
      columnOrderIds: columnOrderIds
        ? [...new Set([...existBoard.columnOrderIds, ...columnOrderIds])]
        : existBoard.columnOrderIds,
      ...rest,
    };

    if (title) {
      const existTitle = await this.boardRepo.isTitleTaken(title);
      if (existTitle) throw new ConflictError('A board with this title already exists');

      newBoardUpdate.title = title;
      newBoardUpdate.slug = slugify(title);
    }

    const updated = await this.boardRepo.update(id, newBoardUpdate);

    if (!updated) throw new BadRequestError(`Board update failed for ID: ${id}`);
    return updated;
  }

  public async delete(id: DeleteBoardParamDTO['id']): Promise<void> {
    await this.getById(id);
    const isDelete = await this.boardRepo.delete(id);
    if (!isDelete) throw new BadRequestError('Board deletion failed');
  }
}
