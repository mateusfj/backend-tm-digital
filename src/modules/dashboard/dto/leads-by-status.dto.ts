import { ApiProperty } from '@nestjs/swagger';
import { LeadStatus } from 'src/common/enums/lead-status';

export class LeadsByStatusItemDto {
  @ApiProperty({ description: 'Status of the lead', enum: LeadStatus })
  status: LeadStatus;

  @ApiProperty({
    description: 'Total number of leads with the corresponding status',
  })
  total: number;

  @ApiProperty({
    description: 'Percentage of leads with the corresponding status',
  })
  percentage: number;
}
