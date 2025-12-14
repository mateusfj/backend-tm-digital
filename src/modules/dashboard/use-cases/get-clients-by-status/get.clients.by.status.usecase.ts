import { Injectable } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { ClientsByStatusItem } from '../../types/clients-by-status.interface';
import { LeadStatus } from 'src/common/enums/lead-status';

@Injectable()
export class GetClientsByStatusUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(): Promise<ClientsByStatusItem[]> {
    const leads = await this.leadRepository.findAll();
    const counts = new Map<LeadStatus, number>();
    const totalLeads = leads.length;

    Object.values(LeadStatus).forEach((status) => {
      counts.set(status, 0);
    });

    for (const lead of leads) {
      const current = counts.get(lead.status) ?? 0;
      counts.set(lead.status, current + 1);
    }

    return Array.from(counts.entries()).map(([status, total]) => ({
      status,
      total,
      percentage: totalLeads > 0 ? (total / totalLeads) * 100 : 0,
    }));
  }
}
