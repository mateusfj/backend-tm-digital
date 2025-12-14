import { Injectable } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';

import { LeadStatus } from 'src/common/enums/lead-status';
import { LeadsByStatusItemDto } from '../../dto/leads-by-status.dto';
import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';

@Injectable()
export class GetClientsByStatusUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(): Promise<LeadsByStatusItemDto[]> {
    const leads: Lead[] = await this.leadRepository.findAll();
    const counts = new Map<LeadStatus, number>();
    const totalLeads: number = leads.length;

    Object.values(LeadStatus).forEach((status: LeadStatus): void => {
      counts.set(status, 0);
    });

    for (const lead of leads) {
      const current: number = counts.get(lead.status) ?? 0;
      counts.set(lead.status, current + 1);
    }

    return Array.from(counts.entries()).map(([status, total]) => ({
      status,
      total,
      percentage: totalLeads > 0 ? (total / totalLeads) * 100 : 0,
    }));
  }
}
