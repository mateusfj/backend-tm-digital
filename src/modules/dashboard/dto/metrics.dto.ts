import { ApiProperty } from '@nestjs/swagger';

export class DashboardMetricsDto {
  @ApiProperty({ description: 'Total number of registered leads' })
  totalLeads: number;

  @ApiProperty({
    description: 'Total number of leads with properties over 100 hectares',
  })
  totalLeadsWithPropertiesOver100Hectares: number;

  @ApiProperty({
    description: 'Total area of properties',
  })
  totalArea: number;

  @ApiProperty({
    description: 'Total number of distinct municipalities with properties',
  })
  totalMunicipalities: number;
}
