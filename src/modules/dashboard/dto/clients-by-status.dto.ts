import { LeadStatus } from 'src/common/enums/lead-status';

export class ClientsByStatusItemDto {
  status: LeadStatus;
  total: number;
  percentage: number;
}
