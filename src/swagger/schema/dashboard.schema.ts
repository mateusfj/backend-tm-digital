import { LeadsByStatusItemDto } from 'src/modules/dashboard/dto/leads-by-status.dto';
import { DashboardMetricsDto } from 'src/modules/dashboard/dto/metrics.dto';
import { TopMunicipalityItemDto } from 'src/modules/dashboard/dto/top-municipality.dto';

export const DASHBOARD_SCHEMA = {
  metrics: {
    method: 'get' as const,
    summary: 'Dashboard Metrics',
    description:
      'General dashboard metrics, including total leads and properties.',
    response: [
      {
        status: 200,
        description: 'metrics returned successfully',
        type: DashboardMetricsDto,
      },
    ],
  },
  clients_by_status: {
    method: 'get' as const,
    summary: 'Leads by Status',
    description: 'Total leads grouped by status.',
    response: [
      {
        status: 200,
        description: 'leads by status returned successfully',
        type: LeadsByStatusItemDto,
        isArray: true,
      },
    ],
  },
  top_municipality: {
    method: 'get' as const,
    summary: 'Top Municipalities',
    description:
      'List of the most recurring municipalities (number of properties registered per municipality).',
    response: [
      {
        status: 200,
        description: 'top municipalities returned successfully',
        type: TopMunicipalityItemDto,
        isArray: true,
      },
    ],
  },
};
