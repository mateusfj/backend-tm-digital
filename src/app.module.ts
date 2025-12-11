import { Module } from '@nestjs/common';
import { LeadsModule } from './modules/leads/leads.module';
import { PropertiesModule } from './modules/properties/properties.module';

@Module({
  imports: [LeadsModule, PropertiesModule],
})
export class AppModule {}
