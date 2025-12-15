import { Test, type TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { CreateLeadUseCase } from './use-cases/create-lead/create.lead.usecase';
import { GetLeadUseCase } from './use-cases/get-lead/get.lead.usecase';
import { DeleteLeadUseCase } from './use-cases/delete-lead/delete.lead.usecase';
import { UpdateLeadUseCase } from './use-cases/update-lead/update.lead.usecase';
import { ListLeadsUseCase } from './use-cases/list-leads/list.leads.usecase';

describe('LeadsController', () => {
  let controller: LeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        { provide: CreateLeadUseCase, useValue: { execute: jest.fn() } },
        { provide: GetLeadUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteLeadUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateLeadUseCase, useValue: { execute: jest.fn() } },
        { provide: ListLeadsUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
