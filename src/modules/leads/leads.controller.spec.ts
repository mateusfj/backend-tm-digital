import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';

import { LEADS_PROVIDERS } from './leads.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forFeature([Lead])],
      controllers: [LeadsController],
      providers: [...LEADS_PROVIDERS],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
