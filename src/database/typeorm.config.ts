import { ConfigService } from '@nestjs/config/dist/config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Property } from './repositories/typeorm/properties/properties.entity';
import { Lead } from './repositories/typeorm/lead/lead.entity';

export const typeormConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: Number(config.get('POSTGRES_PORT')),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  autoLoadEntities: true,
  entities: [Property, Lead],
  synchronize: true,
});
