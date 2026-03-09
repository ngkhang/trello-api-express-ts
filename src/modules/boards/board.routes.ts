/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { Router } from 'express';

import { BoardController } from '~/modules/boards/board.controller';

const controller = new BoardController();
const router = Router();

router.get('/:id', controller.getById);

export { router as boardRouter };
