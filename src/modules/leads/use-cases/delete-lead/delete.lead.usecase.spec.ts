/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NotFoundException } from '@nestjs/common';
import { DeleteLeadUseCase } from './delete.lead.usecase';

describe('DeleteLeadUseCase', () => {
  let leadRepository: any;
  let propertyRepository: any;
  let useCase: DeleteLeadUseCase;

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

    propertyRepository = {
      create: jest.fn(),
      findOne: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAllWithFilters: jest.fn(),
      findAllByLeadId: jest.fn(),
    };

    useCase = new DeleteLeadUseCase(leadRepository, propertyRepository);
  });

  it('should delete lead and its properties when lead exists', async () => {
    const id = 'lead-id';

    (leadRepository.findOne as jest.Mock).mockResolvedValue({ id } as any);
    (propertyRepository.findAllByLeadId as jest.Mock).mockResolvedValue([
      { id: 'property-1' },
      { id: 'property-2' },
    ]);

    const result = await useCase.execute(id);

    expect(leadRepository.findOne).toHaveBeenCalledWith(id);
    expect(propertyRepository.findAllByLeadId).toHaveBeenCalledWith(id);
    expect(propertyRepository.delete).toHaveBeenCalledTimes(2);
    expect(propertyRepository.delete).toHaveBeenCalledWith('property-1');
    expect(propertyRepository.delete).toHaveBeenCalledWith('property-2');
    expect(leadRepository.delete).toHaveBeenCalledWith(id);
    expect(result).toEqual({ message: 'Lead deleted successfully' });
  });

  it('should throw NotFoundException when lead does not exist', async () => {
    const id = 'missing-id';

    (leadRepository.findOne as jest.Mock).mockResolvedValue(undefined);

    await expect(useCase.execute(id)).rejects.toBeInstanceOf(NotFoundException);
    expect(propertyRepository.findAllByLeadId).not.toHaveBeenCalled();
    expect(leadRepository.delete).not.toHaveBeenCalled();
  });
});
