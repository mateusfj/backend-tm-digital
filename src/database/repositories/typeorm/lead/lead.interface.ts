import { RepositoryInterface } from 'src/@types/repository/repository.interface';
import { Lead } from './lead.entity';
import type { ListLeadsQueryDto } from 'src/modules/leads/dto/list-leads.query.dto';

export interface LeadRepositoryInterface extends RepositoryInterface<Lead> {
  findOneByCpf(cpf: string): Promise<Lead>;
  findAllWithFilters(query: ListLeadsQueryDto): Promise<Lead[]>;
}

export const LEAD_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'LeadRepositoryInterface',
);
