/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { DeletePropertyUseCase } from './delete.property.usecase';

describe('DeletePropertyUseCase', () => {
  let propertyRepository: any;
  let useCase: DeletePropertyUseCase;

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

    useCase = new DeletePropertyUseCase(propertyRepository);
  });

  it('should delete property when it exists', async () => {
    const id = 'property-id';

    (propertyRepository.findOne as jest.Mock).mockResolvedValue({ id } as any);

    const result = await useCase.execute(id);

    expect(propertyRepository.findOne).toHaveBeenCalledWith(id);
    expect(propertyRepository.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ message: 'Property deleted successfully' });
  });

  it('should throw NotFoundException when property does not exist', async () => {
    const id = 'missing-id';

    (propertyRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id)).rejects.toBeInstanceOf(NotFoundException);
    expect(propertyRepository.delete).not.toHaveBeenCalled();
  });
});
