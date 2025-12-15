/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from '@nestjs/common';
import { GetPropertyUseCase } from './get.property.usecase';

describe('GetPropertyUseCase', () => {
  let propertyRepository: any;
  let useCase: GetPropertyUseCase;

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

    useCase = new GetPropertyUseCase(propertyRepository);
  });

  it('should return property when it exists', async () => {
    const id = 'property-id';
    const property = { id, name: 'Farm 1' } as any;

    (propertyRepository.findOne as jest.Mock).mockResolvedValue(property);

    const result = await useCase.execute(id);

    expect(propertyRepository.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe(property);
  });

  it('should throw NotFoundException when property does not exist', async () => {
    const id = 'missing-id';

    (propertyRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id)).rejects.toBeInstanceOf(NotFoundException);
  });
});
