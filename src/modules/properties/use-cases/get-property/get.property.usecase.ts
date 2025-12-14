import { Injectable, NotFoundException } from '@nestjs/common';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import { PropertyResponseDto } from '../../dto/create-property.dto';

@Injectable()
export class GetPropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findOne(id);

    if (!property) throw new NotFoundException('Property not found');

    return property;
  }
}
