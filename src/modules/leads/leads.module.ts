import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsController } from './leads.controller';
import { LEADS_PROVIDERS } from './leads.providers';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Property])],
  controllers: [LeadsController],
  providers: [...LEADS_PROVIDERS],
})
export class LeadsModule {}
