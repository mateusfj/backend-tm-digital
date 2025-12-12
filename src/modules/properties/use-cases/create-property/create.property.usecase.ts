import { Injectable } from '@nestjs/common';
import { CreatePropertyDto } from '../../dto/create-property.dto';
import { v4 as uuid } from 'uuid';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const payload = {
      id: uuid(),
      ...createPropertyDto,
    } as Property;

    return this.propertyRepository.create(payload);
  }
}
