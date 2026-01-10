import { Injectable } from '@nestjs/common';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

@Injectable()
export class HashService {
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${salt}.${hash.toString('hex')}`;
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, hash] = hashedPassword.split('.');
    const hashToCompare = (await scryptAsync(password, salt, 64)) as Buffer;

    return hash === hashToCompare.toString('hex');
  }
}
