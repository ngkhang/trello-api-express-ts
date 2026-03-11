/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-11
 ------------------------------------------------- */

import { Router } from 'express';

import { asyncHandler } from '~/middleware/async-handler.middleware';
import { validateRequest } from '~/middleware/validate.middleware';
import { BoardController } from '~/modules/boards/board.controller';
import { boardRequestSchema } from '~/modules/boards/board.schema';

const controller = new BoardController();
const router = Router();

router.get('/', asyncHandler(controller.getAll));
router.get('/:id', validateRequest(boardRequestSchema.getById), asyncHandler(controller.getById));
router.post('/', validateRequest(boardRequestSchema.create), asyncHandler(controller.create));
router.delete('/:id', validateRequest(boardRequestSchema.delete), asyncHandler(controller.delete));
router.put('/:id', validateRequest(boardRequestSchema.update), asyncHandler(controller.update));

export { router as boardRouter };
