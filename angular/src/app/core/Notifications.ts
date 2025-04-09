import { User } from "./User";

  export class Notifications implements iNotifications{
    id?: number | undefined;
    description: string;
    sender: User;
    receiver: User;
    constructor (){

    }
}
export interface iNotifications {
  id?: number;
  description: string;
  sender: User;
  receiver: User;
}
