import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from './properties.controller';
import { PROPERTIES_PROVIDERS } from './properties.providers';

describe('PropertiesController', () => {
  let controller: PropertiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [...PROPERTIES_PROVIDERS],
    }).compile();

    controller = module.get<PropertiesController>(PropertiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
