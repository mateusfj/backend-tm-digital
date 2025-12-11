import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeadsModule } from './modules/leads/leads.module';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [LeadsModule, PropertiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
