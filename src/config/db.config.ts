/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

import dns from 'dns/promises';

import type { Collection, Db } from 'mongodb';
import { MongoClient, ServerApiVersion } from 'mongodb';

import { envConfig } from '~/config/env.config';
import type { BoardDocument } from '~/modules/boards/board.document';
import type { CardDocument } from '~/modules/cards/card.document';
import type { ColumnDocument } from '~/modules/columns/column.document';

// Fix error: Error: querySrv ECONNREFUSED
dns.setServers(['1.1.1.1']);

export const COLLECTION_NAMES = {
  BOARDS: 'boards',
  CARDS: 'cards',
  COLUMNS: 'columns',
} as const;

interface CollectionTypeMap {
  [COLLECTION_NAMES.BOARDS]: BoardDocument;
  [COLLECTION_NAMES.CARDS]: CardDocument;
  [COLLECTION_NAMES.COLUMNS]: ColumnDocument;
}

type CollectionMap = {
  [K in keyof CollectionTypeMap]: () => Collection<CollectionTypeMap[K]>;
};

class Database {
  private static instance: Database | null = null;
  private client: MongoClient | null = null;
  private db: Db | null = null;

  constructor() {
    process.on('SIGINT', async () => {
      await this.close();
      process.exit(0);
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public async connect(): Promise<Db> {
    if (this.db) return this.db;
    console.info(`Connecting MongoDB...`);
    this.client = new MongoClient(envConfig.db.uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await this.client.connect();
    this.db = this.client.db();
    console.info('MongoDB connected');
    return this.db;
  }

  public async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
      console.info('Closed to MongoDB Cloud Atlas');
    }
  }

  public getDb(): Db {
    if (!this.db) throw new Error('Please connect to database first');
    return this.db;
  }
}

export const database = Database.getInstance();
const connectDb = async (): Promise<Db> => await database.connect();
const closeDb = async (): Promise<void> => await database.close();
const getDb = (): Db => database.getDb();
const collections: CollectionMap = {
  boards: () => database.getDb().collection(COLLECTION_NAMES.BOARDS),
  cards: () => database.getDb().collection(COLLECTION_NAMES.CARDS),
  columns: () => database.getDb().collection(COLLECTION_NAMES.COLUMNS),
};

export { connectDb, closeDb, getDb, collections };
