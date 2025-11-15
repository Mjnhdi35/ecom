import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    // let a = '';
    // a = 0;
    return 'Hello World!';
  }
}
