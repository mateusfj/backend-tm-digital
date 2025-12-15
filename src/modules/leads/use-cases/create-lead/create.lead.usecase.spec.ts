/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ConflictException } from '@nestjs/common';
import { LeadStatus } from '../../../../common/enums/lead-status';
import { CreateLeadUseCase } from './create.lead.usecase';
import type { CreateLeadDto } from '../../dto/create-lead.dto';

describe('CreateLeadUseCase', () => {
  let leadRepository: any;
  let useCase: CreateLeadUseCase;

  beforeEach(() => {
    leadRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findOneByCpf: jest.fn(),
      findAllWithFilters: jest.fn(),
    };

    useCase = new CreateLeadUseCase(leadRepository);
  });

  it('should create a lead when cpf does not exist', async () => {
    const dto: CreateLeadDto = {
      name: 'John Doe',
      cpf: '12345678900',
      phone: '999999999',
      email: 'john@example.com',
      status: LeadStatus.NEW,
      comments: 'test',
      city: 'City',
    };

    (leadRepository.findOneByCpf as jest.Mock).mockResolvedValue(null);
    (leadRepository.create as jest.Mock).mockResolvedValue({
      id: 'generated-id',
      ...dto,
    });

    const result = await useCase.execute(dto);

    expect(leadRepository.findOneByCpf).toHaveBeenCalledWith(dto.cpf);
    expect(leadRepository.create).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
    expect(result.cpf).toBe(dto.cpf);
  });

  it('should throw ConflictException when cpf already exists', async () => {
    const dto: CreateLeadDto = {
      name: 'John Doe',
      cpf: '12345678900',
      phone: '999999999',
      email: 'john@example.com',
      status: LeadStatus.NEW,
      comments: 'test',
      city: 'City',
    };

    (leadRepository.findOneByCpf as jest.Mock).mockResolvedValue({
      id: 'existing-id',
      ...dto,
    });

    await expect(useCase.execute(dto)).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(leadRepository.create).not.toHaveBeenCalled();
  });
});
