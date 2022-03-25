import { Injectable } from '@nestjs/common';

@Injectable()
export class CommissionService {
  getHello() {
    return 'commission';
  }
}
