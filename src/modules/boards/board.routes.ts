/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-10
 ------------------------------------------------- */

import { Router } from 'express';

import { validateRequest } from '~/middleware/validate.middleware';
import { BoardController } from '~/modules/boards/board.controller';
import { boardRequestSchema } from '~/modules/boards/board.schema';

const controller = new BoardController();
const router = Router();

router.get('/', controller.list);
router.get('/:id', validateRequest(boardRequestSchema.id), controller.getById);
router.post('/', validateRequest(boardRequestSchema.create), controller.create);
router.delete('/:id', validateRequest(boardRequestSchema.delete), controller.delete);
router.put('/:id', validateRequest(boardRequestSchema.update), controller.update);

export { router as boardRouter };
