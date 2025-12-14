import { Injectable } from '@nestjs/common';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import type { ListPropertiesQueryDto } from '../../dto/list-properties.query.dto';
import { PropertyResponseDto } from '../../dto/create-property.dto';

@Injectable()
export class ListPropertiesUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(
    query?: ListPropertiesQueryDto,
  ): Promise<PropertyResponseDto[]> {
    return await this.propertyRepository.findAllWithFilters(query);
  }
}
