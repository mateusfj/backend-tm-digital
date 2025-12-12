import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  IsCPF,
  IsMobilePhoneNumber,
  IsValidName,
} from 'src/common/decorators/validate.decorator';
import { LeadStatus } from 'src/common/enums/lead-status';

export class CreateLeadDto {
  @ApiProperty({
    example: 'John Doe',
  })
  @IsValidName()
  name: string;

  @ApiProperty({
    example: '12345678900',
  })
  @IsCPF()
  cpf: string;

  @ApiProperty({
    example: '11999999999',
  })
  @IsMobilePhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

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

export class LeadResponseDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    example: '123.456.789-00',
  })
  cpf: string;

  @ApiProperty({
    example: '+5511999999999',
  })
  phone: string;

  @ApiProperty({
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    example: LeadStatus.NEW,
  })
  status: LeadStatus;

  @ApiProperty({
    example: 'Interested in product X',
  })
  comments?: string;

  @ApiProperty({
    example: 'New York',
  })
  city?: string;
}
