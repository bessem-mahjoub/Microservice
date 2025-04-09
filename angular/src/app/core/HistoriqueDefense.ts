import { User } from "./User";

export interface HistoriqueDefense {

    idDef: number;
    dateDefense: Date;
    timeDefense: string;
    numeroDeBloc: string;
    numeroDeClasse: number;
    nomDeJuret?: Partial<User>;
    UserStudent?: Partial<User>;
    
    nomDeEncadrent: string;
    remarque: string; 
}