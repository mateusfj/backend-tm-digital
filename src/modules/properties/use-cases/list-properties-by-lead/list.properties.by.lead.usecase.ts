import { Injectable } from '@nestjs/common';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

@Injectable()
export class ListPropertiesByLeadUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(leadId: string): Promise<Property[]> {
    const properties =
      await this.propertyRepository.findPropertiesByLead(leadId);

    return properties;
  }
}
