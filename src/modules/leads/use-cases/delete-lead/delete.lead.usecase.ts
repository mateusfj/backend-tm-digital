import { Injectable, NotFoundException } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { DeleteLeadResponseDto } from '../../dto/delete-lead.dto';

@Injectable()
export class DeleteLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(id: string): Promise<DeleteLeadResponseDto> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    await this.leadRepository.delete(id);

    return { message: 'Lead deleted successfully' };
  }
}
