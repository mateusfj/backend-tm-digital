import { Injectable, NotFoundException } from '@nestjs/common';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

@Injectable()
export class GetPropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne(id);

    if (!property) throw new NotFoundException('Property not found');

    return property;
  }
}
