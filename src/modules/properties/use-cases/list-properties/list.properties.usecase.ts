import { Injectable } from '@nestjs/common';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import type { ListPropertiesQueryDto } from '../../dto/list-properties.query.dto';

@Injectable()
export class ListPropertiesUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(query?: ListPropertiesQueryDto): Promise<Property[]> {
    return await this.propertyRepository.findAllWithFilters(query);
  }
}
