import { Controller, Get } from '@nestjs/common';
import { GetDashboardMetricsUseCase } from './use-cases/get-dashboard-metrics/get.dashboard.metrics.usecase';
import { GetClientsByStatusUseCase } from './use-cases/get-clients-by-status/get.clients.by.status.usecase';
import { GetTopMunicipalityUseCase } from './use-cases/get-top-municipality/get.top.municipality.usecase';

import { SwaggerDocs } from 'src/common/decorators/swagger.decorator';
import { DASHBOARD_SCHEMA } from 'src/swagger/schema/dashboard.schema';
import { DashboardMetricsDto } from './dto/metrics.dto';
import { LeadsByStatusItemDto } from './dto/leads-by-status.dto';
import { TopMunicipalityItemDto } from './dto/top-municipality.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(
    private readonly getDashboardMetricsUseCase: GetDashboardMetricsUseCase,
    private readonly getClientsByStatusUseCase: GetClientsByStatusUseCase,
    private readonly getTopMunicipalityUseCase: GetTopMunicipalityUseCase,
  ) {}

  @SwaggerDocs(DASHBOARD_SCHEMA.metrics)
  @Get('metrics')
  getMetrics(): Promise<DashboardMetricsDto> {
    return this.getDashboardMetricsUseCase.execute();
  }

  @SwaggerDocs(DASHBOARD_SCHEMA.clients_by_status)
  @Get('leads-by-status')
  getLeadsByStatus(): Promise<LeadsByStatusItemDto[]> {
    return this.getClientsByStatusUseCase.execute();
  }

  @SwaggerDocs(DASHBOARD_SCHEMA.top_municipality)
  @Get('top-municipality')
  getTopMunicipality(): Promise<TopMunicipalityItemDto[]> {
    return this.getTopMunicipalityUseCase.execute();
  }
}
