import { ClientsByStatusItemDto } from 'src/modules/dashboard/dto/clients-by-status.dto';
import { DashboardMetricsDto } from 'src/modules/dashboard/dto/metrics.dto';
import { TopMunicipalityItemDto } from 'src/modules/dashboard/dto/top-municipality.dto';

export const DASHBOARD_SCHEMA = {
  metrics: {
    method: 'get' as const,
    summary: 'Métricas do Dashboard',
    description:
      'Retorna métricas agregadas para os cards do dashboard (leads, propriedades e municípios).',
    response: [
      {
        status: 200,
        description: 'métricas retornadas com sucesso',
        type: DashboardMetricsDto,
      },
    ],
  },
  clients_by_status: {
    method: 'get' as const,
    summary: 'Clientes por Status',
    description: 'Total de clientes agrupados por status.',
    response: [
      {
        status: 200,
        description: 'clientes por status retornados com sucesso',
        type: ClientsByStatusItemDto,
        isArray: true,
      },
    ],
  },
  top_municipality: {
    method: 'get' as const,
    summary: 'Top Municípios',
    description:
      'Lista de municípios mais recorrentes (quantidade de propriedades cadastradas por município).',
    response: [
      {
        status: 200,
        description: 'top municípios retornados com sucesso',
        type: TopMunicipalityItemDto,
        isArray: true,
      },
    ],
  },
};
