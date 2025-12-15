/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { GetClientsByStatusUseCase } from './get.clients.by.status.usecase';
import { LeadStatus } from '../../../../common/enums/lead-status';

describe('GetClientsByStatusUseCase', () => {
  let leadRepository: any;
  let useCase: GetClientsByStatusUseCase;

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

    useCase = new GetClientsByStatusUseCase(leadRepository);
  });

  it('should count leads by status and calculate percentages', async () => {
    const leads = [
      { id: '1', status: LeadStatus.NEW },
      { id: '2', status: LeadStatus.INITIAL_CONTACT },
      { id: '3', status: LeadStatus.INITIAL_CONTACT },
    ];

    (leadRepository.findAll as jest.Mock).mockResolvedValue(leads);

    const result = await useCase.execute();

    expect(leadRepository.findAll).toHaveBeenCalled();

    const newStatus = result.find((item) => item.status === LeadStatus.NEW);
    const inContactStatus = result.find(
      (item) => item.status === LeadStatus.INITIAL_CONTACT,
    );

    expect(newStatus?.total).toBe(1);
    expect(newStatus?.percentage).toBeCloseTo((1 / 3) * 100);
    expect(inContactStatus?.total).toBe(2);
    expect(inContactStatus?.percentage).toBeCloseTo((2 / 3) * 100);
  });

  it('should return 0 percentage when there are no leads', async () => {
    (leadRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await useCase.execute();

    expect(leadRepository.findAll).toHaveBeenCalled();
    result.forEach((item) => {
      expect(item.total).toBe(0);
      expect(item.percentage).toBe(0);
    });
  });
});
