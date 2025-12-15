import { Test, type TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { CreatePropertyUseCase } from './use-cases/create-property/create.property.usecase';
import { GetPropertyUseCase } from './use-cases/get-property/get.property.usecase';
import { DeletePropertyUseCase } from './use-cases/delete-property/delete.property.usecase';
import { UpdatePropertyUseCase } from './use-cases/update-property/update.property.usecase';
import { ListPropertiesUseCase } from './use-cases/list-properties/list.properties.usecase';

describe('PropertiesController', () => {
  let controller: PropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        { provide: CreatePropertyUseCase, useValue: { execute: jest.fn() } },
        { provide: GetPropertyUseCase, useValue: { execute: jest.fn() } },
        { provide: DeletePropertyUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdatePropertyUseCase, useValue: { execute: jest.fn() } },
        { provide: ListPropertiesUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
