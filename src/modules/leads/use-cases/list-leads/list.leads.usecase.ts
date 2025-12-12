import { Injectable } from '@nestjs/common';

import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';

@Injectable()
export class ListLeadsUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(): Promise<Lead[]> {
    return this.leadRepository.findAll();
  }
}
