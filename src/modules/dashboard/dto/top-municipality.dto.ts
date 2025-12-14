import { ApiProperty } from '@nestjs/swagger';

export class TopMunicipalityItemDto {
  @ApiProperty({ description: 'Name of the municipality' })
  municipality: string;
  @ApiProperty({
    description: 'Total number of properties registered in the municipality',
  })
  total: number;
}
