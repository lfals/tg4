import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommissionController } from './commission/commission.controller';
import { CommissionService } from './commission/commission.service';
import { CommissionModule } from './commission/commission.module';

@Module({
  imports: [CommissionModule],
  controllers: [AppController, CommissionController],
  providers: [AppService, CommissionService],
})
export class AppModule {}
