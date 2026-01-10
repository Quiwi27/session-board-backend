import { Inject, Provider } from '@nestjs/common';
import db, { DB } from './db.client';

export const DB_PROVIDER = 'DbProvider';
export const InjectDb = () => Inject(DB_PROVIDER);

export const dbProvider: Provider<DB> = {
  provide: DB_PROVIDER,
  useValue: db,
};
