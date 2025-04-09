import { User } from "./User";


export interface ChatMessage {
  id?: number;
  message: string;
  timestamp: Date;
  sender: User;
  recipient: User;
}
