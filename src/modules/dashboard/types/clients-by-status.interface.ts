import { LeadStatus } from 'src/common/enums/lead-status';

export interface ClientsByStatusItem {
  status: LeadStatus;
  total: number;
  percentage: number;
}
