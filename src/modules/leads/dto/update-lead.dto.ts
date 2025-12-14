import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { LeadStatus } from 'src/common/enums/lead-status';

export class UpdateLeadDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    example: '123.456.789-00',
  })
  @IsString()
  @IsOptional()
  cpf?: string;

  @ApiProperty({
    example: '11999999999',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    example: LeadStatus.NEW,
    enum: LeadStatus,
    required: false,
  })
  @IsEnum(LeadStatus)
  @IsOptional()
  status?: LeadStatus;

  @ApiProperty({
    example: 'Interested in product X',
    required: false,
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({
    example: 'New York',
    required: false,
  })
  @IsString()
  @IsOptional()
  city?: string;
}
