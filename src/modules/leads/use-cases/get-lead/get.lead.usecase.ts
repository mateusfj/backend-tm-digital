import { Injectable, NotFoundException } from '@nestjs/common';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';

@Injectable()
export class GetLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    return lead;
  }
}
