import { ApiProperty } from '@nestjs/swagger';

export class DeleteLeadResponseDto {
  @ApiProperty({ example: 'Lead deleted successfully' })
  message: string;
}
