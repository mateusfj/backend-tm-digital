import { LeadRepository } from 'src/database/repositories/typeorm/lead/lead.repository';
import { CreateLeadUseCase } from './use-cases/create-lead/create.lead.usecase';
import { GetLeadUseCase } from './use-cases/get-lead/get.lead.usecase';
import { DeleteLeadUseCase } from './use-cases/delete-lead/delete.lead.usecase';
import { UpdateLeadUseCase } from './use-cases/update-lead/update.lead.usecase';
import { ListLeadsUseCase } from './use-cases/list-leads/list.leads.usecase';
import { LEAD_REPOSITORY_INTERFACE } from 'src/database/repositories/typeorm/lead/lead.interface';
import { Provider } from '@nestjs/common';
import { PropertyRepository } from 'src/database/repositories/typeorm/properties/properties.repository';
import { PROPERTY_REPOSITORY_INTERFACE } from 'src/database/repositories/typeorm/properties/properties.interface';

export const LEADS_PROVIDERS = [
  LeadRepository,
  PropertyRepository,
  {
    provide: LEAD_REPOSITORY_INTERFACE,
    useClass: LeadRepository,
  },
  {
    provide: PROPERTY_REPOSITORY_INTERFACE,
    useClass: PropertyRepository,
  },
  {
    provide: CreateLeadUseCase,
    useFactory: (leadRepository: LeadRepository) => {
      return new CreateLeadUseCase(leadRepository);
    },
    inject: [LEAD_REPOSITORY_INTERFACE],
  },
  {
    provide: GetLeadUseCase,
    useFactory: (leadRepository: LeadRepository) => {
      return new GetLeadUseCase(leadRepository);
    },
    inject: [LEAD_REPOSITORY_INTERFACE],
  },
  {
    provide: DeleteLeadUseCase,
    useFactory: (
      leadRepository: LeadRepository,
      propertyRepository: PropertyRepository,
    ) => {
      return new DeleteLeadUseCase(leadRepository, propertyRepository);
    },
    inject: [LEAD_REPOSITORY_INTERFACE, PROPERTY_REPOSITORY_INTERFACE],
  },
  {
    provide: UpdateLeadUseCase,
    useFactory: (leadRepository: LeadRepository) => {
      return new UpdateLeadUseCase(leadRepository);
    },
    inject: [LEAD_REPOSITORY_INTERFACE],
  },
  {
    provide: ListLeadsUseCase,
    useFactory: (leadRepository: LeadRepository) => {
      return new ListLeadsUseCase(leadRepository);
    },
    inject: [LEAD_REPOSITORY_INTERFACE],
  },
] as Provider[];
