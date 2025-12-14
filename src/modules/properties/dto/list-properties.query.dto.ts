import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { Crop } from 'src/common/enums/crop';

export class ListPropertiesQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsEnum(Crop)
  @IsString()
  @IsOptional()
  crop?: Crop;

  @IsOptional()
  @IsUUID()
  lead_id?: string;

  @IsOptional()
  @IsString()
  municipality?: string;
}
