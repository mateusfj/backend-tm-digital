import { RepositoryInterface } from 'src/@types/repository/repository.interface';
import { Lead } from './lead.entity';

export interface LeadRepositoryInterface extends RepositoryInterface<Lead> {
  findOneByCpf(cpf: string): Promise<Lead>;
}

export const LEAD_REPOSITORY_INTERFACE: unique symbol = Symbol(
  'LeadRepositoryInterface',
);
