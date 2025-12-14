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
import { PropertyType } from 'src/common/enums/property-type';

export class CreatePropertyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsNotEmpty()
  lead_id: string;

  @ApiProperty({
    example: 'Fazenda Boa Vista',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'COUNTRY_HOUSE',
    enum: PropertyType,
  })
  @IsEnum(PropertyType)
  @IsNotEmpty()
  property_type: PropertyType;

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
    example: 'Teresina',
  })
  @IsString()
  @IsOptional()
  municipality: string;
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
    example: 'Fazenda Boa Vista',
  })
  name: string;

  @ApiProperty({
    example: PropertyType.COUNTRY_HOUSE,
  })
  property_type: PropertyType;

  @ApiProperty({
    example: 100.5,
  })
  area: number;

  @ApiProperty({
    example: 'Teresina',
  })
  municipality: string;

  @ApiProperty({
    example: '2024-12-12T10:00:00Z',
  })
  created_at?: Date;

  @ApiProperty({
    example: '2024-12-12T10:00:00Z',
  })
  updated_at?: Date;

  @ApiProperty({
    example: null,
  })
  deleted_at?: Date | null;
}
