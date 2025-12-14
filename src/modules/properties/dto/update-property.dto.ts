import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { PropertyType } from 'src/common/enums/property-type';
import { Crop } from 'src/common/enums/crop';

export class UpdatePropertyDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  lead_id?: string;

  @ApiProperty({
    example: 'Fazenda Boa Vista',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: 'COUNTRY_HOUSE',
    enum: PropertyType,
  })
  @IsEnum(PropertyType)
  @IsOptional()
  property_type?: PropertyType;

  @ApiProperty({
    example: Crop.CORN,
    enum: Crop,
  })
  @IsEnum(Crop)
  @IsOptional()
  crop?: Crop;

  @ApiProperty({
    example: 100.5,
  })
  @IsNumber()
  @IsOptional()
  area?: number;

  @ApiProperty({
    example: 'Teresina',
  })
  @IsString()
  @IsOptional()
  municipality?: string;
}
