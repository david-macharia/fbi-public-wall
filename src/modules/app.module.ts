import { Module } from '@nestjs/common';
import { WantedModule } from './wanted.module';
import { CoreModule } from './base.module';

@Module({
  imports: [WantedModule, CoreModule],
})
export class AppModule {}
