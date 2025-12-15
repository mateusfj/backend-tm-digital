import { RepositoryInterface } from 'src/@types/repository/repository.interface';
import { Property } from './properties.entity';
import type { ListPropertiesQueryDto } from 'src/modules/properties/dto/list-properties.query.dto';

export interface PropertyRepositoryInterface extends RepositoryInterface<Property> {
  findAllWithFilters(query: ListPropertiesQueryDto): Promise<Property[]>;
  findAllByLeadId(leadId: string): Promise<Property[]>;
}

export const PROPERTY_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'PropertyRepositoryInterface',
);
