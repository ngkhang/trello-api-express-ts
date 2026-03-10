/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-10
 ------------------------------------------------- */

import { ObjectId } from 'mongodb';

import { BoardMapper } from '~/modules/boards/board.mapper';
import type { BoardDocument, Board, CreateBoard, UpdateBoard } from '~/modules/boards/board.schema';
import { stringIdToObject } from '~/utils/converts.util';

// In-memory store
const boards: Map<string, BoardDocument> = new Map([
  [
    '69aa9d31386e1d9687f7b4cb',
    {
      _id: new ObjectId('69aa9d31386e1d9687f7b4cb'),
      title: 'Board 1',
      slug: 'board-1',
      type: '001',
      description: '',
      _destroy: false,
      createdAt: new Date(),
      updatedAt: null,
      columnOrderIds: [],
    },
  ],
]);

export class BoardRepository {
  private readonly boardMapper = new BoardMapper();

  public async findMany(): Promise<Board[]> {
    const results = Array.from(boards.values());
    // TODO: Implement query params to filter

    return results.map(this.boardMapper.toDomain);
  }

  public async findById(id: Board['id']): Promise<Board | null> {
    const boardDoc = boards.get(id);
    return boardDoc ? this.boardMapper.toDomain(boardDoc) : null;
  }

  public async create(data: CreateBoard): Promise<Board> {
    const _id = new ObjectId();
    const newBoard: BoardDocument = {
      ...data,
      _id,
      createdAt: new Date(),
      updatedAt: null,
      columnOrderIds: [],
      _destroy: false,
    };

    boards.set(_id.toString(), newBoard);
    return this.boardMapper.toDomain(newBoard);
  }

  public async update(id: Board['id'], data: UpdateBoard): Promise<Board | null> {
    const existing = boards.get(id);

    if (!existing) return null;

    const updated: BoardDocument = {
      ...existing,
      ...data,
      columnOrderIds: data.columnOrderIds
        ? data.columnOrderIds.map(stringIdToObject)
        : existing.columnOrderIds,
      updatedAt: new Date(),
    };

    boards.set(id, updated);
    return this.boardMapper.toDomain(updated);
  }

  public async delete(id: Board['id']): Promise<boolean> {
    return boards.delete(id);
  }

  public async existByTitle(title: Board['title']): Promise<boolean> {
    for (const board of boards.values()) {
      if (board.title === title) return true;
    }
    return false;
  }
}
