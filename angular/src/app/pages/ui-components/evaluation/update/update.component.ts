import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { defense } from 'src/app/core/Defense';
import { evaluation } from 'src/app/core/Evaluation';
import { DefenceService } from 'src/app/services/defence.service';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})

  export class UpdateComponentt {
    defenseList: defense[] = [];
    usedDefenseIds: number[] = [];
    selectedDefenseId: number = 0;
    
    constructor(
      public dialogRef: MatDialogRef<UpdateComponentt>,
      @Inject(MAT_DIALOG_DATA) public data: evaluation,
      private evaluationService: EvaluationService,
      private defenceService: DefenceService
    ) {
      this.loadDefenses();
      //this.loadUsedDefenseIds();
    }
  
    loadDefenses(): void {
      this.defenceService.getAllDefenses().subscribe(
        (defenses: defense[]) => {
          this.defenseList = defenses;
        },
        (error) => {
          console.error('Erreur lors de la récupération des défenses:', error);
        }
      );
    }
  
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
  
    updateEvaluation(evaluation: evaluation): void {
      this.evaluationService.updateEvaluation(this.data.id, evaluation).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          this.dialogRef.close(true);
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    }
  
    onClose(): void {
      this.dialogRef.close(false); 
    }
  
  
}
