/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from '@nestjs/common';
import { UpdatePropertyUseCase } from './update.property.usecase';
import type { UpdatePropertyDto } from '../../dto/update-property.dto';

describe('UpdatePropertyUseCase', () => {
  let propertyRepository: any;
  let useCase: UpdatePropertyUseCase;

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

    useCase = new UpdatePropertyUseCase(propertyRepository);
  });

  it('should update an existing property', async () => {
    const id = 'property-id';
    const existingProperty = { id, name: 'Old Name' } as any;
    const dto: UpdatePropertyDto = { name: 'New Name' } as UpdatePropertyDto;

    (propertyRepository.findOne as jest.Mock).mockResolvedValue(
      existingProperty,
    );
    (propertyRepository.update as jest.Mock).mockResolvedValue(undefined);

    const result = await useCase.execute(id, dto);

    expect(propertyRepository.findOne).toHaveBeenCalledWith(id);
    expect(propertyRepository.update).toHaveBeenCalledWith({
      ...existingProperty,
      ...dto,
    });
    expect(result).toEqual({ ...existingProperty, ...dto });
  });

  it('should throw NotFoundException when property does not exist', async () => {
    const id = 'missing-id';
    const dto: UpdatePropertyDto = { name: 'New Name' } as UpdatePropertyDto;

    (propertyRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id, dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(propertyRepository.update).not.toHaveBeenCalled();
  });
});
