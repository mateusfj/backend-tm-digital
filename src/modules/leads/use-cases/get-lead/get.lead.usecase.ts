import { Injectable, NotFoundException } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { LeadResponseDto } from '../../dto/create-lead.dto';

@Injectable()
export class GetLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(id: string): Promise<LeadResponseDto> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    return lead;
  }
}
