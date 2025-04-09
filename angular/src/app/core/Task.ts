import { User } from "./User";

export interface Task {
  id: number;
  taskDescription: string;
  progress: string;
  duration: string;
  supervisor: User;
  student: User;
  attachmentFileName?: string;
  attachmentData?: ArrayBuffer | string;
}

