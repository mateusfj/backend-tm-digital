/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NotFoundException } from '@nestjs/common';
import { UpdateLeadUseCase } from './update.lead.usecase';
import type { UpdateLeadDto } from '../../dto/update-lead.dto';

describe('UpdateLeadUseCase', () => {
  let leadRepository: any;
  let useCase: UpdateLeadUseCase;

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

    useCase = new UpdateLeadUseCase(leadRepository);
  });

  it('should update an existing lead', async () => {
    const id = 'lead-id';
    const existingLead = { id, name: 'Old Name' } as any;
    const dto: UpdateLeadDto = { name: 'New Name' } as UpdateLeadDto;

    (leadRepository.findOne as jest.Mock).mockResolvedValue(existingLead);
    (leadRepository.update as jest.Mock).mockResolvedValue(undefined);

    const result = await useCase.execute(id, dto);

    expect(leadRepository.findOne).toHaveBeenCalledWith(id);
    expect(leadRepository.update).toHaveBeenCalledWith({
      ...existingLead,
      ...dto,
    });
    expect(result).toEqual({ ...existingLead, ...dto });
  });

  it('should throw NotFoundException when lead does not exist', async () => {
    const id = 'missing-id';
    const dto: UpdateLeadDto = { name: 'New Name' } as UpdateLeadDto;

    (leadRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id, dto)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(leadRepository.update).not.toHaveBeenCalled();
  });
});
