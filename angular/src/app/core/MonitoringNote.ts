import { Status } from './Status.enum';
import { TurnIn } from './TurnIn';

export interface MonitoringNote {
  id?: number;
  submissionDate: Date;
  comment: string;
  grade: number;
  turnIn: TurnIn;
  status:Status

}
