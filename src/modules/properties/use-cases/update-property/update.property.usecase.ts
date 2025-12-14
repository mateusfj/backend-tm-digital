import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdatePropertyDto } from '../../dto/update-property.dto';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import { PropertyResponseDto } from '../../dto/create-property.dto';

@Injectable()
export class UpdatePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyResponseDto> {
    const property = await this.propertyRepository.findOne(id);

    if (!property) throw new NotFoundException('Property not found');

    const payload = {
      ...property,
      ...updatePropertyDto,
    };

    await this.propertyRepository.update(payload);

    return payload;
  }
}
