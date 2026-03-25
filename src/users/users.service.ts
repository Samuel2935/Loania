import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
}

@Injectable()
export class UsersService {
  constructor(@Inject('PG_POOL') private readonly pool: Pool) {}

  //Find user by email
  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
    const { rows } = await this.pool.query(query, [email]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows[0] ?? null;
  }

  //Create user
  async create(name: string, email: string, password: string): Promise<User> {
    // Check if user exists
    const existing = await this.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    // Hash password
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const { rows } = await this.pool.query(query, [
      name,
      email,
      hashedPassword,
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows[0];
  }

  // Get all users
  async findAll(): Promise<User[]> {
    const { rows } = await this.pool.query('SELECT * FROM users;');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows;
  }

  //Find by ID (needed for auth)
  async findById(id: string): Promise<User | null> {
    const { rows } = await this.pool.query(
      'SELECT * FROM users WHERE id = $1 LIMIT 1;',
      [id],
    );

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return rows[0] ?? null;
  }
}
