/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';

import { COLLECTION_NAMES, collections } from '~/config/db.config';
import type { BoardDocument, UpdateBoardDocument } from '~/modules/boards/board.document';
import { BoardMapper } from '~/modules/boards/board.mapper';
import type { Board, CreateBoard, UpdateBoard } from '~/modules/boards/board.type';
import { stringIdToObject } from '~/utils/converts.util';

export class BoardRepository {
  private readonly boardMapper = new BoardMapper();
  private readonly boardCollection = collections[COLLECTION_NAMES.BOARDS];

  public async findMany(): Promise<Board[]> {
    const boards = await this.boardCollection().find().toArray();
    // TODO: Implement query params to filter

    return boards.map(this.boardMapper.toDomain);
  }

  public async findById(id: Board['id']): Promise<Board | null> {
    const boardDoc = await this.boardCollection().findOne({ _id: stringIdToObject(id) });
    return boardDoc ? this.boardMapper.toDomain(boardDoc) : null;
  }

  public async create(data: CreateBoard): Promise<Board | null> {
    const newBoard: BoardDocument = {
      ...data,
      _id: new ObjectId(),
      columnOrderIds: [],
      _destroy: false,
      createdAt: new Date(),
      updatedAt: null,
    };

    const { acknowledged } = await this.boardCollection().insertOne(newBoard);

    return acknowledged ? this.boardMapper.toDomain(newBoard) : null;
  }

  public async update(id: Board['id'], data: UpdateBoard): Promise<Board | null> {
    const updateBoard: UpdateBoardDocument = {
      ...data,
      columnOrderIds: data.columnOrderIds && data.columnOrderIds.map(stringIdToObject),
      updatedAt: new Date(),
    };
    const boardUpdated = await this.boardCollection().findOneAndUpdate(
      { _id: stringIdToObject(id) },
      { $set: updateBoard },
      { returnDocument: 'after' },
    );
    return boardUpdated ? this.boardMapper.toDomain(boardUpdated) : null;
  }

  // TODO: Implement soft-delete method
  public async delete(id: Board['id']): Promise<boolean> {
    const { deletedCount } = await this.boardCollection().deleteOne({ _id: stringIdToObject(id) });

    return deletedCount > 0;
  }

  public async isTitleTaken(title: Board['title']): Promise<boolean> {
    const count = await this.boardCollection().countDocuments({ title });
    return count > 0;
  }
}
