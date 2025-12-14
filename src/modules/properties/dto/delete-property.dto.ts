import { ApiProperty } from '@nestjs/swagger';

export class DeletePropertyDto {
  id: string;
}

export class DeletePropertyResponse {
  @ApiProperty({
    example: 'Property deleted successfully',
  })
  message: string;
}
