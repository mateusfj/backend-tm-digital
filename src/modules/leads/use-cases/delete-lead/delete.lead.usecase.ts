import { Injectable, NotFoundException } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';

@Injectable()
export class DeleteLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(id: string): Promise<string> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    await this.leadRepository.delete(id);

    return 'Lead deleted successfully';
  }
}
