export interface InternshipInter {
    id?: number; // L'id est facultatif car il sera généré côté serveur
    idCompany: number;
    duration: string;
    subject: string;
    description: string;
    degreeStageO: string;
    type: string; // Ou vous pouvez utiliser une énumération pour les types
  }
  