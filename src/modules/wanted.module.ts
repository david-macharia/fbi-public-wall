import { Module } from '@nestjs/common';
import { WantedController } from 'src/controllers/wanted.controller';
import { CoreModule } from './base.module';
import { WantedService } from 'src/services/wanted.service';

@Module({
  imports: [CoreModule],
  controllers: [WantedController],
  providers: [WantedService],
})
export class WantedModule {}
