/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GetDashboardMetricsUseCase } from './get.dashboard.metrics.usecase';

describe('GetDashboardMetricsUseCase', () => {
  let leadRepository: any;
  let propertyRepository: any;
  let useCase: GetDashboardMetricsUseCase;

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

    useCase = new GetDashboardMetricsUseCase(
      leadRepository,
      propertyRepository,
    );
  });

  it('should calculate dashboard metrics correctly', async () => {
    const leads = [{ id: '1' }, { id: '2' }, { id: '3' }];
    const properties = [
      { id: 'p1', area: 50, lead_id: '1', municipality: 'CityA' },
      { id: 'p2', area: 120, lead_id: '2', municipality: 'CityB ' },
      { id: 'p3', area: 200, lead_id: '2', municipality: 'CityB' },
    ];

    (leadRepository.findAll as jest.Mock).mockResolvedValue(leads);
    (propertyRepository.findAll as jest.Mock).mockResolvedValue(properties);

    const result = await useCase.execute();

    expect(leadRepository.findAll).toHaveBeenCalled();
    expect(propertyRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual({
      totalLeads: 3,
      totalLeadsWithPropertiesOver100Hectares: 1,
      totalArea: 370,
      totalMunicipalities: 2,
    });
  });
});
