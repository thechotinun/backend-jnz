import { Injectable } from '@nestjs/common';

@Injectable()
export class JenosizeService {
  async hello() {
    return 'Hello World 👋 🌍';
  }
}
