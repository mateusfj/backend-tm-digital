/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { GetLeadUseCase } from './get.lead.usecase';

describe('GetLeadUseCase', () => {
  let leadRepository: any;
  let useCase: GetLeadUseCase;

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

    useCase = new GetLeadUseCase(leadRepository);
  });

  it('should return a lead when it exists', async () => {
    const id = 'lead-id';
    const lead = { id, name: 'John Doe' } as any;

    (leadRepository.findOne as jest.Mock).mockResolvedValue(lead);

    const result = await useCase.execute(id);

    expect(leadRepository.findOne).toHaveBeenCalledWith(id);
    expect(result).toBe(lead);
  });

  it('should throw NotFoundException when lead does not exist', async () => {
    const id = 'missing-id';

    (leadRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id)).rejects.toBeInstanceOf(NotFoundException);
  });
});
