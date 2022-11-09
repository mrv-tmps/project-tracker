import { resolve } from 'path';

import { config } from 'dotenv';
import { DataSource } from 'typeorm';
config({ path: resolve(__dirname, '../../.env') });

export const LocalDataSource = new DataSource({
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*'],
  password: process.env.DB_PASSWORD,
  synchronize: false,
  type: 'postgres',
  username: process.env.DB_USERNAME,
});
