import { Module } from '@nestjs/common';
import { LeadsModule } from './modules/leads/leads.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LeadsModule,
    PropertiesModule,
    DatabaseModule,
  ],
})
export class AppModule {}
