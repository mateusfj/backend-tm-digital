/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from '@nestjs/common';
import { CreatePropertyUseCase } from './create.property.usecase';
import type { CreatePropertyDto } from '../../dto/create-property.dto';

describe('CreatePropertyUseCase', () => {
  let propertyRepository: any;
  let leadRepository: any;
  let useCase: CreatePropertyUseCase;

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

    leadRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOneByCpf: jest.fn(),
      findAllWithFilters: jest.fn(),
    };

    useCase = new CreatePropertyUseCase(propertyRepository, leadRepository);
  });

  it('should create a property when owner exists', async () => {
    const dto: CreatePropertyDto = {
      lead_id: 'lead-id',
      name: 'Farm 1',
      property_type: undefined as any,
      crop: undefined as any,
      area: 100,
      municipality: 'City',
    };

    (leadRepository.findOne as jest.Mock).mockResolvedValue({
      id: dto.lead_id,
    });
    (propertyRepository.create as jest.Mock).mockImplementation(
      async (payload) => await payload,
    );

    const result = await useCase.execute(dto);

    expect(leadRepository.findOne).toHaveBeenCalledWith(dto.lead_id);
    expect(propertyRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
    expect(result.lead_id).toBe(dto.lead_id);
  });

  it('should throw NotFoundException when owner does not exist', async () => {
    const dto: CreatePropertyDto = {
      lead_id: 'missing-id',
      name: 'Farm 1',
      property_type: undefined as any,
      crop: undefined as any,
      area: 100,
      municipality: 'City',
    };

    (leadRepository.findOne as jest.Mock).mockResolvedValue(null);

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(propertyRepository.create).not.toHaveBeenCalled();
  });
});
