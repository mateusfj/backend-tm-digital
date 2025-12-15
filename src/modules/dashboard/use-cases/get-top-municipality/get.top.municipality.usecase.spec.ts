/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GetTopMunicipalityUseCase } from './get.top.municipality.usecase';

describe('GetTopMunicipalityUseCase', () => {
  let propertyRepository: any;
  let useCase: GetTopMunicipalityUseCase;

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

    useCase = new GetTopMunicipalityUseCase(propertyRepository);
  });

  it('should return municipalities ordered by total properties', async () => {
    const properties = [
      { municipality: 'CityA' },
      { municipality: 'CityB ' },
      { municipality: 'CityB' },
      { municipality: null },
      { municipality: '' },
    ];

    (propertyRepository.findAll as jest.Mock).mockResolvedValue(properties);

    const result = await useCase.execute();

    expect(propertyRepository.findAll).toHaveBeenCalled();
    expect(result).toEqual([
      { municipality: 'CityB', total: 2 },
      { municipality: 'CityA', total: 1 },
    ]);
  });
});
