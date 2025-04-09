import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/User';
import { EvaluationComponent } from '../evaluation.component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { evaluation } from 'src/app/core/Evaluation';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { defense } from 'src/app/core/Defense';
import { DefenceService } from 'src/app/services/defence.service';
import { HistoriqueDefense } from 'src/app/core/HistoriqueDefense';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-createe',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

export class CreateComponentt {
  id: number;
  defense: defense; 
  tutor: User;
  student: User;
  note: number; 
  description: string;
  selectedDefenseId: number ;
  defenseList: defense[] ;
  historiqueDefenseArray:HistoriqueDefense[] ; 
  usedDefenseIds: number[] = [];
  studentIdLabel: number | undefined;
   idDfenceR : number ; 
  evaluations: evaluation[] = [];
  historiqueDefense :HistoriqueDefense ;
  numeroStockee :number ; 
  constructor(
    private router: Router,
    private http: HttpClient,
    private defenceService: DefenceService,
    private evaluationService: EvaluationService,
    private fb: FormBuilder,
    private dialog: MatDialog,userService:UserService
  ) {
   // this.defenseList = [];
  }
  
  ngOnInit(): void {
   /* this.defenceService.getAllDefence().subscribe(
      (defenses: defense[]) => {
        this.defenseList = defenses;
      },
      (error) => {
        console.error('Erreur lors de la récupération des défenses:', error);
      }
    );*/
    this.loadDefenses() ; 
    this.loadHistoriqueDefenses();
    //this.loadUsedDefenseIds();
  }
  loadHistoriqueDefenses(): void {
    this.defenceService.getAllHistoriqueDefense().subscribe(
      (historiqueDefenses: HistoriqueDefense[]) => {
        this.historiqueDefenseArray = historiqueDefenses;
        console.log('historiqueDefenseArray:', this.historiqueDefenseArray);
      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'historique des défenses:', error);
      }
    );
  }
  
  loadDefenses(): void {
    this.defenceService.getAllDefenses().subscribe(
      (defenses: defense[]) => {
        this.defenseList = defenses;
        console.log('defenseList:', this.defenseList);
      },
      (error) => {
        console.error('Erreur lors de la récupération des défenses:', error);
      }
    );
  }
  
  /*loadUsedHistoriqueDefenseIds(): void {
    // Appel à la méthode du service pour récupérer les IDs de défense déjà utilisés
    this.evaluationService.getUsedDefenseIds().subscribe(
      (usedIds: number[]) => {
        this.usedDefenseIds = usedIds;
      },
      (error) => {
        console.error('Erreur lors de la récupération des IDs de défense utilisés:', error);
      }
    );
  }*/
  /*loadUsedDefenseIds(): void {
    // Appel à la méthode du service pour récupérer les IDs de défense déjà utilisés
    this.evaluationService.getUsedDefenseIds().subscribe(
      (usedIds: number[]) => {
        this.usedDefenseIds = usedIds;
      },
      (error) => {
        console.error('Erreur lors de la récupération des IDs de défense utilisés:', error);
      }
    );
  }*/

 /* onDefenseIdChange(): void {
    const selectedDefense = this.defenseList.find(defense => defense.idDef === this.selectedDefenseId);
    if (selectedDefense && selectedDefense.UserStudent && typeof selectedDefense.UserStudent.id === 'number') {
      this.student = selectedDefense.UserStudent as User; // Utilisation de 'as User' pour indiquer au compilateur que UserStudent est de type User
    } else {
      //this.student = null;
    }
}*/



  
  
addEvaluation(): void {
  const newEvaluation: evaluation = {
    id: this.id, 
    HistoriqueDefense: { idDef: this.selectedDefenseId },
    tutor: this.tutor, 
    student: this.student, 
    note: this.note, 
    description: this.description,
   // numeroStockee: this.selectedDefenseId
  };

  this.evaluationService.createEvaluation(this.selectedDefenseId, newEvaluation).subscribe(
    () => {
     // this.idDfenceR=this.defense.idDef  ;
      //console.log('Evaluation:',this.idDfenceR);
 
      console.log('Evaluation ajoutée avec succès');
      console.log('Evaluation:',newEvaluation);
       console.log("selectedDefenseId",this.selectedDefenseId)
       this.numeroStockee=this.selectedDefenseId ; 
      // Ajouter la nouvelle évaluation à votre tableau d'évaluations localement
      this.evaluations.push(newEvaluation);
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de l\'évaluation :', error);
    }
  );
  
  
}


  
  


/*addEvaluation(): void {
  const newEvaluation: evaluation = {
    id: this.id, 
    defense: { idDef: this.selectedDefenseId },
    tutor: this.tutor, 
    student: this.student, 
    note: this.note, 
    description: this.description
  };

  this.evaluationService.createEvaluation(newEvaluation).subscribe(
    (response) => {
      console.log('Evaluation ajoutée avec succès :', response);
      // Déplacer les données de la défense vers historiquedefense
       // this.moveDefenseToHistory(this.selectedDefenseId);
    },
    (error) => {
      console.error('Erreur lors de l\'ajout de l\'évaluation :', error);
    }
  );
} */

/*moveDefenseToHistory(defenseId: number): void {
  this.defenceService.moveOldDefensesToHistory(defenseId).subscribe(
    (response) => {
      console.log('Défense déplacée vers l\'historique avec succès :', response);
      // Supprimer la défense de la liste des défenses
      this.defenseList = this.defenseList.filter(defense => defense.idDef !== defenseId);
    },
    (error) => {
      console.error('Erreur lors du déplacement de la défense vers l\'historique :', error);
    }
  ); 
}*/

  
}
