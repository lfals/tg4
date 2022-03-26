import { Body, Controller, Post } from '@nestjs/common';
import { CommissionService } from './commission.service';

@Controller('calcula-comissao')
export class CommissionController {
  constructor(private readonly commissionService: CommissionService) {}

  @Post()
  commissions(@Body() sales: ISales) {
    return this.commissionService.getCommissions(sales);
  }
}
