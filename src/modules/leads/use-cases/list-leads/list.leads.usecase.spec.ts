/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ListLeadsUseCase } from './list.leads.usecase';
import type { ListLeadsQueryDto } from '../../dto/list-leads.query.dto';

describe('ListLeadsUseCase', () => {
  let leadRepository: any;
  let useCase: ListLeadsUseCase;

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

    useCase = new ListLeadsUseCase(leadRepository);
  });

  it('should list leads using repository with filters', async () => {
    const query: ListLeadsQueryDto = { city: 'City' } as ListLeadsQueryDto;
    const leads = [{ id: '1' }, { id: '2' }] as any[];

    (leadRepository.findAllWithFilters as jest.Mock).mockResolvedValue(leads);

    const result = await useCase.execute(query);

    expect(leadRepository.findAllWithFilters).toHaveBeenCalledWith(query);
    expect(result).toBe(leads);
  });
});
