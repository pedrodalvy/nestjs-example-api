import * as path from 'node:path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.resolve(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [
    path.resolve(__dirname, '..', 'database', 'migrations', '*{.ts,.js}'),
  ],
  cli: {
    migrationsDir: path.resolve(__dirname, '..', 'database', 'migrations'),
  },
};

module.exports = ormConfig;
