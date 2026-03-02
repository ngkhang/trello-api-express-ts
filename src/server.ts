/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-02
 ------------------------------------------------- */

import { createApp } from '~/app';

const HOST = 'localhost';
const PORT = 3000;

async function bootstrap(): Promise<void> {
    const app = createApp();

    const server = app.listen(PORT, () => {
        console.info(`🚀 Server running at http://${HOST}:${PORT}`);
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
})
