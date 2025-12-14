import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository, FindOptionsWhere } from 'typeorm';
import { Property } from './properties.entity';

import { PropertyRepositoryInterface } from './properties.interface';
import type { ListPropertiesQueryDto } from 'src/modules/properties/dto/list-properties.query.dto';

@Injectable()
export class PropertyRepository implements PropertyRepositoryInterface {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  async create(data: Property): Promise<Property> {
    const property = await this.propertyRepository.save(data);
    return property;
  }

  async findAll(): Promise<Property[]> {
    const properties: Property[] = await this.propertyRepository.find({
      relations: ['lead'],
      select: {
        lead: {
          id: true,
          name: true,
        },
      },
    });
    return properties;
  }

  async findAllWithFilters(query: ListPropertiesQueryDto): Promise<Property[]> {
    const where: FindOptionsWhere<Property> = {};

    if (query.lead_id) {
      where.lead_id = query.lead_id;
    }

    if (query.municipality) {
      where.municipality = query.municipality;
    }

    if (query.crop) {
      where.crop = query.crop;
    }

    if (query.search) {
      where.name = ILike(`%${query.search.trim()}%`);
    }

    const properties: Property[] = await this.propertyRepository.find({
      where,
      relations: ['lead'],
      select: {
        lead: {
          id: true,
          name: true,
        },
      },
    });
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
