/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import { createApp } from '~/app';
import { envConfig } from '~/config/env.config';

const { host, port, prefix } = envConfig.app;
const URL = `http://${host}:${port}/${prefix}`;

async function bootstrap(): Promise<void> {
  const app = createApp();

  const server = app.listen(port, () => {
    console.info(`🚀 Server running in "${envConfig.nodeEnv}" mode on port ${port}`);
    console.info(`📡 API available at ${URL}`);
  });

  process.on('SIGINT', () => {
    console.info(`SIGINT — shutting down gracefully…`);
    server.close(async () => {
      process.exit(0);
    });
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start: ', err);
  process.exit(1);
});
