import { defense } from './Defense';
import { HistoriqueDefense } from './HistoriqueDefense';
import { User } from './User';

export interface evaluation {
    id: number;
    defense?: Partial<defense>; // Utilisez Partial pour rendre toutes les propriétés de defense facultatives
    tutor: User;
    student: User;
    note: number;
    description: string;
   // historiqueDefense?: Partial<HistoriqueDefense>; // Utilisez Partial pour rendre toutes les propriétés de defense facultatives

   // numeroStockee: number;
    HistoriqueDefense?: Partial<HistoriqueDefense>;

}
