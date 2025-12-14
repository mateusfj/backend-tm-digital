import { Provider } from '@nestjs/common';
import { LeadRepository } from 'src/database/repositories/typeorm/lead/lead.repository';
import { LEAD_REPOSITORY_INTERFACE } from 'src/database/repositories/typeorm/lead/lead.interface';
import { PropertyRepository } from 'src/database/repositories/typeorm/properties/properties.repository';
import { PROPERTY_REPOSITORY_INTERFACE } from 'src/database/repositories/typeorm/properties/properties.interface';
import { GetDashboardMetricsUseCase } from './use-cases/get-dashboard-metrics/get.dashboard.metrics.usecase';
import { GetClientsByStatusUseCase } from './use-cases/get-clients-by-status/get.clients.by.status.usecase';
import { GetTopMunicipalityUseCase } from './use-cases/get-top-municipality/get.top.municipality.usecase';

export const DASHBOARD_PROVIDERS = [
  LeadRepository,
  PropertyRepository,
  {
    provide: LEAD_REPOSITORY_INTERFACE,
    useClass: LeadRepository,
  },
  {
    provide: PROPERTY_REPOSITORY_INTERFACE,
    useClass: PropertyRepository,
  },
  {
    provide: GetDashboardMetricsUseCase,
    useFactory: (
      leadRepository: LeadRepository,
      propertyRepository: PropertyRepository,
    ): GetDashboardMetricsUseCase =>
      new GetDashboardMetricsUseCase(leadRepository, propertyRepository),
    inject: [LEAD_REPOSITORY_INTERFACE, PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: GetClientsByStatusUseCase,
    useFactory: (leadRepository: LeadRepository): GetClientsByStatusUseCase =>
      new GetClientsByStatusUseCase(leadRepository),
    inject: [LEAD_REPOSITORY_INTERFACE],
  },
  {
    provide: GetTopMunicipalityUseCase,
    useFactory: (
      propertyRepository: PropertyRepository,
    ): GetTopMunicipalityUseCase =>
      new GetTopMunicipalityUseCase(propertyRepository),
    inject: [PROPERTY_REPOSITORY_INTERFACE],
  },
] as Provider[];
