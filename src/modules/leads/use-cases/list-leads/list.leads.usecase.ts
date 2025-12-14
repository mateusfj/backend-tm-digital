import { Injectable } from '@nestjs/common';

import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import type { ListLeadsQueryDto } from '../../dto/list-leads.query.dto';
import { LeadResponseDto } from '../../dto/create-lead.dto';

@Injectable()
export class ListLeadsUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(query?: ListLeadsQueryDto): Promise<LeadResponseDto[]> {
    return this.leadRepository.findAllWithFilters(query);
  }
}
