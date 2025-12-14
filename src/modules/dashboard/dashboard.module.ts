import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import { DashboardController } from './dashboard.controller';
import { DASHBOARD_PROVIDERS } from './dashboard.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Lead, Property])],
  controllers: [DashboardController],
  providers: [...DASHBOARD_PROVIDERS],
})
export class DashboardModule {}
