import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LeadStatus } from 'src/common/enums/lead-status';

export class ListLeadsQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(LeadStatus)
  @IsString()
  status?: LeadStatus;

  @IsOptional()
  @IsString()
  municipality?: string;
}
