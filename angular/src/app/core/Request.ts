import { Company } from 'src/app/core/Company';
import { Offer } from "./Offer";
import { User } from "./User";

export class Request {
    id? : Number;
    submit : boolean;
    message : String;
    offer : Offer;
    student : User;
    supervisor : User;
}
