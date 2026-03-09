/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-09
 ------------------------------------------------- */

import { Router } from 'express';

import { boardRouter } from '~/modules/boards/board.routes';

const routes = Router();

routes.use('/boards', boardRouter);

export default routes;
