import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './properties.entity';

import { PropertyRepositoryInterface } from './properties.interface';

@Injectable()
export class PropertyRepository implements PropertyRepositoryInterface {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async findPropertiesByLead(leadId: string): Promise<Property[]> {
    const properties: Property[] = await this.propertyRepository.find({
      where: { lead_id: leadId },
    });
    return properties;
  }

  async create(data: Property): Promise<Property> {
    const property = await this.propertyRepository.save(data);
    return property;
  }

  async findAll(): Promise<Property[]> {
    const properties: Property[] = await this.propertyRepository.find();
    return properties;
  }

  async findOne(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({ where: { id } });
    return property;
  }

  async delete(id: string): Promise<void> {
    await this.propertyRepository.softDelete({ id });
  }

  async update(data: Property): Promise<void> {
    await this.propertyRepository.update(data.id, {
      ...data,
    });
  }
}
