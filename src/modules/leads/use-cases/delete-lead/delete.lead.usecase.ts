import { Injectable, NotFoundException } from '@nestjs/common';
import type { LeadRepositoryInterface } from 'src/database/repositories/typeorm/lead/lead.interface';
import type { PropertyRepositoryInterface } from 'src/database/repositories/typeorm/properties/properties.interface';
import type { Property } from 'src/database/repositories/typeorm/properties/properties.entity';
import { DeleteLeadResponseDto } from '../../dto/delete-lead.dto';

@Injectable()
export class DeleteLeadUseCase {
  constructor(
    private readonly leadRepository: LeadRepositoryInterface,
    private readonly propertyRepository: PropertyRepositoryInterface,
  ) {}

  async execute(id: string): Promise<DeleteLeadResponseDto> {
    const lead = await this.leadRepository.findOne(id);

    if (!lead) throw new NotFoundException('Lead not found');

    const properties: Property[] =
      await this.propertyRepository.findAllByLeadId(id);

    if (properties.length > 0) {
      await Promise.all(
        properties.map(
          (property: Property): Promise<void> =>
            this.propertyRepository.delete(property.id),
        ),
      );
    }

    await this.leadRepository.delete(id);

    return { message: 'Lead deleted successfully' };
  }
}
