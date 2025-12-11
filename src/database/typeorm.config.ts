import { ConfigService } from '@nestjs/config/dist/config.service';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: config.get('POSTGRES_HOST'),
  port: Number(config.get('POSTGRES_PORT')),
  username: config.get('POSTGRES_USER'),
  password: config.get('POSTGRES_PASSWORD'),
  database: config.get('POSTGRES_DB'),
  autoLoadEntities: true,
  synchronize: true,
});
