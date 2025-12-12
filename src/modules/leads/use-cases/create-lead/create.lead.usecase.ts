import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLeadDto } from '../../dto/create-lead.dto';
import { v4 as uuid } from 'uuid';

import { Lead } from 'src/database/repositories/typeorm/lead/lead.entity';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import { LeadStatus } from 'src/common/enums/lead-status';

@Injectable()
export class CreateLeadUseCase {
  constructor(private readonly leadRepository: LeadRepositoryInterface) {}

  async execute(createLeadDto: CreateLeadDto): Promise<Lead> {
    const user = await this.leadRepository.findOneByCpf(createLeadDto.cpf);

    if (user) throw new ConflictException('Lead with this CPF already exists');

    const payload = {
      id: uuid(),
      name: createLeadDto.name,
      cpf: createLeadDto.cpf,
      phone: createLeadDto.phone,
      email: createLeadDto.email,
      status: createLeadDto.status ?? LeadStatus.NEW,
      comments: createLeadDto.comments ?? null,
      city: createLeadDto.city ?? null,
    };

    return this.leadRepository.create(payload);
  }
}
