import { Injectable } from '@nestjs/common';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

@Injectable()
export class ListPropertiesUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(): Promise<Property[]> {
    return this.propertyRepository.findAll();
  }
}
