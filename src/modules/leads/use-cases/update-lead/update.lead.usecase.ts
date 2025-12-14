import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLeadDto } from '../../dto/update-lead.dto';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { LeadResponseDto } from '../../dto/create-lead.dto';

@Injectable()
export class UpdateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(
    id: string,
    updateLeadDto: UpdateLeadDto,
  ): Promise<LeadResponseDto> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    const payload = {
      ...lead,
      ...updateLeadDto,
    };

    await this.leadRepository.update(payload);

    return payload;
  }
}
