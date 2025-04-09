import { Company } from "./Company";
import { TypeInternship } from "./TypeInternship";

export class Offer {
    id: number;
    dateStart: Date;
    dateEnd: Date;
    typeInternship: TypeInternship;
    company: Company;
}
