import { Injectable } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import { DashboardMetrics } from '../../types/metrics.interface';

@Injectable()
export class GetDashboardMetricsUseCase {
  constructor(
    private readonly leadRepository: LeadRepositoryInterface,
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(): Promise<DashboardMetrics> {
    const [leads, properties] = await Promise.all([
      this.leadRepository.findAll(),
      this.propertyRepository.findAll(),
    ]);

    const totalLeads: number = leads.length;

    let totalArea: number = 0;
    const leadIdsWithOver100 = new Set<string>();
    const municipalitiesSet = new Set<string>();

    for (const property of properties) {
      const areaNum = Number(property.area);
      totalArea += isNaN(areaNum) ? 0 : areaNum;

      if (areaNum > 100 && property.lead_id) {
        leadIdsWithOver100.add(property.lead_id);
      }

      if (property.municipality) {
        municipalitiesSet.add(property.municipality.trim());
      }
    }

    return {
      totalLeads,
      totalLeadsWithPropertiesOver100Hectares: leadIdsWithOver100.size,
      totalArea,
      totalMunicipalities: municipalitiesSet.size,
    };
  }
}
