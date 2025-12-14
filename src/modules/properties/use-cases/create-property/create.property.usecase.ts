import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePropertyDto,
  PropertyResponseDto,
} from '../../dto/create-property.dto';
import { v4 as uuid } from 'uuid';
import { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';

@Injectable()
export class CreatePropertyUseCase {
  constructor(
    private readonly propertyRepository: PropertyRepositoryInterface,
    private readonly leadRepository: LeadRepositoryInterface,
  ) {}

  async execute(
    createPropertyDto: CreatePropertyDto,
  ): Promise<PropertyResponseDto> {
    const userExists: Lead = await this.leadRepository.findOne(
      createPropertyDto.lead_id,
    );

    if (!userExists) throw new NotFoundException('Proprietário não encontrado');

    const payload = {
      id: uuid(),
      ...createPropertyDto,
    } as Property;

    return this.propertyRepository.create(payload);
  }
}
