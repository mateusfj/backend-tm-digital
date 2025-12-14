import { Injectable } from '@nestjs/common';

import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import type { ListLeadsQueryDto } from '../../dto/list-leads.query.dto';

@Injectable()
export class ListLeadsUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(query?: ListLeadsQueryDto): Promise<Lead[]> {
    return this.leadRepository.findAllWithFilters(query);
  }
}
