import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class UsersService {
  constructor(@Inject('PG_POOL') private pool: Pool) {}

  async createUser(name: string, email: string, password: string) {
    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const { rows } = await this.pool.query(query, [name, email, password]);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows[0];
  }

  async getUsers() {
    const { rows } = await this.pool.query('SELECT * FROM users;');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows;
  }
}
