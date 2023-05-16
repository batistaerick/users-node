import crypto from 'crypto';
import { SECRET } from '../../config';

export function random() {
  return crypto.randomBytes(128).toString('base64');
}

export function authentication(salt: string, password: string) {
  return crypto
    .createHmac('sha256', [salt, password].join('/'))
    .update(SECRET)
    .digest('hex');
}
