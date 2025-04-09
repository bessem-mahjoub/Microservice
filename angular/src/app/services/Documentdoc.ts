
import { User } from "./UserModel";

export class Document {
  idDoc: number;
  name: string;
  content: any;
  type: string;
  selected: boolean;
  userId: number;
  user?: User 
  signature?: string; // Assurez-vous que la propriété user peut être undefined
}
