import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesController } from './properties.controller';
import { PROPERTIES_PROVIDERS } from './properties.providers';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, Lead])],
  controllers: [PropertiesController],
  providers: [...PROPERTIES_PROVIDERS],
})
export class PropertiesModule {}
