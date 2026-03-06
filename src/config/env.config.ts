/* --------------------------------------------------
 * Author: Khang Nguyen - https://github.com/ngkhang
 * Last Updated: 2026-03-06
 ------------------------------------------------- */

import dotEnv from 'dotenv';
import * as z from 'zod';

const NODE_ENVIRONMENT = ['development', 'test', 'production'] as const;

dotEnv.config({
  quiet: process.env.NODE_ENV === 'test',
  path: '.env',
  encoding: 'utf8',
});

const EnvSchema = z.object({
  NODE_ENV: z.enum(NODE_ENVIRONMENT, `Must be one of: ${NODE_ENVIRONMENT.join(', ')}`),
  APP_HOST: z.string('Must is required'),
  APP_PORT: z.coerce
    .number('Must be a number')
    .int('Must be an integer')
    .min(1, 'Must be >= 1')
    .max(65535, 'Must be <= 65535'),
  APP_PREFIX: z
    .string('Must is required')
    .regex(/^[a-zA-Z0-9/-]+$/, 'Must only contain alphanumeric characters, hyphens, or slashes')
    .transform((val) => val.replace(/^\/+/, '')),
  APP_CORS_ORIGIN: z.string('Must is required').transform((val) =>
    val
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  ),
  DB_MONGO_URI: z.string('Must is required'),
});

const { success, data: validated, error } = EnvSchema.safeParse(process.env);

if (!success) {
  const errors = Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0]), issue.message]),
  );

  console.error('Invalid Environment variables:', errors);
  throw new Error('Invalid Environment variables');
}

export const envConfig = {
  nodeEnv: validated.NODE_ENV,
  app: {
    host: validated.APP_HOST,
    port: validated.APP_PORT,
    prefix: validated.APP_PREFIX,
    corsOrigin: validated.APP_CORS_ORIGIN,
  },
  db: {
    uri: validated.DB_MONGO_URI,
  },
};
