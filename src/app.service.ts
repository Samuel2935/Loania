import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'ok',
      services: {
        database: 'connected', // later replace with real check
        queue: 'running',
        payments: 'available',
      },
      timestamp: new Date().toISOString(),
    };
  }
}
