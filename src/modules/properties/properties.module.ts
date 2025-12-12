import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesController } from './properties.controller';
import { PROPERTIES_PROVIDERS } from './properties.providers';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertiesController],
  providers: [...PROPERTIES_PROVIDERS],
})
export class PropertiesModule {}
