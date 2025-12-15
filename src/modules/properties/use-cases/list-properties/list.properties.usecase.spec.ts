/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ListPropertiesUseCase } from './list.properties.usecase';
import type { ListPropertiesQueryDto } from '../../dto/list-properties.query.dto';

describe('ListPropertiesUseCase', () => {
  let propertyRepository: any;
  let useCase: ListPropertiesUseCase;

  beforeEach(() => {
    propertyRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllWithFilters: jest.fn(),
      findAllByLeadId: jest.fn(),
    };

    useCase = new ListPropertiesUseCase(propertyRepository);
  });

  it('should list properties using repository with filters', async () => {
    const query: ListPropertiesQueryDto = {
      municipality: 'City',
    } as ListPropertiesQueryDto;
    const properties = [{ id: '1' }, { id: '2' }] as any[];

    (propertyRepository.findAllWithFilters as jest.Mock).mockResolvedValue(
      properties,
    );

    const result = await useCase.execute(query);

    expect(propertyRepository.findAllWithFilters).toHaveBeenCalledWith(query);
    expect(result).toBe(properties);
  });
});
