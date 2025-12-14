import { Injectable } from '@nestjs/common';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import { TopMunicipalityItemDto } from '../../dto/top-municipality.dto';

@Injectable()
export class GetTopMunicipalityUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(): Promise<TopMunicipalityItemDto[]> {
    const properties: Property[] = await this.propertyRepository.findAll();
    const counts = new Map<string, number>();

    for (const property of properties) {
      const municipality: string = (property.municipality ?? '').trim();
      if (!municipality) continue;
      counts.set(municipality, (counts.get(municipality) ?? 0) + 1);
    }

    return Array.from(counts.entries())
      .map(([municipality, total]) => ({ municipality, total }))
      .sort((a, b) => b.total - a.total);
  }
}
