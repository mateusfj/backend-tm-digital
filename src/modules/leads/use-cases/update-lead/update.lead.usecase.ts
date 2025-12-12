import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateLeadDto } from '../../dto/update-lead.dto';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';

@Injectable()
export class UpdateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
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
