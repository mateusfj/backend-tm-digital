import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Crop } from 'src/common/enums/crop';

export class CreatePropertyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  lead_id: string;

  @ApiProperty({
    example: Crop.CORN,
    enum: Crop,
  })
  @IsEnum(Crop)
  @IsNotEmpty()
  crop: Crop;

  @ApiProperty({
    example: 100.5,
  })
  @IsNumber()
  @IsNotEmpty()
  area: number;

  @ApiProperty({
    example: '{"type": "Polygon", "coordinates": [...]}',
    required: false,
  })
  @IsString()
  @IsOptional()
  geometry?: string;
}

export class PropertyResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  lead_id: string;

  @ApiProperty({
    example: Crop.CORN,
  })
  crop: Crop;

  @ApiProperty({
    example: 100.5,
  })
  area: number;

  @ApiProperty({
    example: '{"type": "Polygon", "coordinates": [...]}',
  })
  geometry?: string;

  @ApiProperty({
    example: '2024-12-12T10:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-12-12T10:00:00Z',
  })
  updatedAt: Date;
}
