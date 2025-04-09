import { Task } from "./Task";
import { User } from "./User";

export interface TurnIn {
  id?: number;
  submissionDate: Date;
  comment: string;
  attachmentFileName?: string;
  attachmentData?: ArrayBuffer | string;
  student: User;
  supervisor: User;
  task: Task;
}
