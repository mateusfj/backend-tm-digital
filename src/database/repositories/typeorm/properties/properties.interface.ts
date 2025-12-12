import { RepositoryInterface } from 'src/@types/repository/repository.interface';
import { Property } from './properties.entity';

export interface PropertyRepositoryInterface extends RepositoryInterface<Property> {
  findPropertiesByLead(leadId: string): Promise<Property[]>;
}

export const PROPERTY_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'PropertyRepositoryInterface',
);
