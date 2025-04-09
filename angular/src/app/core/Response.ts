import { User } from "./User";
import { Complaint } from "./Complaint";
import { SatisfactionLevel } from "./SatisfactionLevel";


export class Response {
  idRep?: number;
  message: string;
  responseDate?: Date;
  ADMIN?: User;
  note:SatisfactionLevel;
  complaintId?: number;
}