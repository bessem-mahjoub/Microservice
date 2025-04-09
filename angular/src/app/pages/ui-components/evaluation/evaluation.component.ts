import { HttpClient } from '@angular/common/http';
import { Component, Input, createComponent } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { evaluation } from 'src/app/core/Evaluation';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { CreateComponentt } from 'src/app/pages/ui-components/evaluation/create/create.component' ; 
import { UpdateComponentt } from './update/update.component';
import { catchError, tap } from 'rxjs';
import { HistoriqueDefense } from 'src/app/core/HistoriqueDefense';
import { DefenceService } from 'src/app/services/defence.service';
import { User } from 'src/app/core/User';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApexAxisChartSeries, ApexChart, ApexResponsive, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import * as moment from 'moment';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  responsive: ApexResponsive[];
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss'] ,
  providers:[EvaluationService]
})

export class EvaluationComponent {
Evaluations :evaluation[] ; 
// Dans votre composant TypeScript
displayedColumns: string[] = ['idDef', 'dateDefense', 'address', 'studentId'];

historiqueDefenseArray: HistoriqueDefense[] = [];
@Input() ressource: any;
@Input() searchTriggered: boolean;
//historiqueDialogShown: boolean;
//historiqueDefenseArray: any[];
query: string = '';
historiqueDialogShown: boolean = false;
//ressource: HistoriqueDefense; // Déclarer la propriété ressource
userList: User[] = [];
searchPerformed = false;
selectedUserIdSuper: number;
value :any[] ;
public chartOptions: Partial<ChartOptions> = {
  series: [],
  chart: {
      height: 350,
      type: "bar"
  },
  title: {
      text: "Top Visited Subjects"
  },
  xaxis: {
      categories: []
  },
};
constructor(private http: HttpClient,private  evaluationService: EvaluationService,    private defenceService: DefenceService,
  private fb:FormBuilder,private dialog: MatDialog)
   {


    }
    ngOnInit() {
      console.log('On init....');
      //this.defenceService.getAllDefence().subscribe((data: defense[]) => {
        //this.defences = data;
      this.fetchEvaluation() ; 
      this.fetchChartData();
     // this.getHistoriqueDefenseId(evaluation) ;
    // this.loadHistoriqueDefenses()   ;
   //  this.historiqueDefenseArray = [];
  
   }
 
    /* this.defenceService.searchHistoriques('numeroDeClasse').subscribe(
      (results) => {
        this.historiqueDefenseArray = results;
      },
      (error) => {
        console.error('Erreur lors de la recherche:', error);
      }
    );*/

  
 openCreateDialogEval(): void {
    const dialogRef = this.dialog.open(CreateComponentt, {
      width: '400px', // Largeur de la boîte de dialogue
      data: {} // Données que vous souhaitez passer au composant de création
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
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
  /*getHistoriqueDefenseId(evaluation: evaluation): number {
    // Logique pour récupérer l'ID de l'entité historiqueDefense correspondant à cette évaluation
    // Par exemple, vous pouvez parcourir votre tableau d'historiqueDefense et comparer les données pour trouver la correspondance
    // Supposons que votre tableau d'historiqueDefense s'appelle historiqueDefenseArray
    const matchingHistoriqueDefense = this.historiqueDefenseArray.find(historiqueDefense => historiqueDefense.idDef === evaluation.defense?.idDef);
    if (matchingHistoriqueDefense) {
      return matchingHistoriqueDefense.idDef;
    } else {
      return -1; // Si aucune correspondance n'est trouvée, retournez une valeur par défaut (par exemple, -1)
    }
  }*/
  /*getHistoriqueDefenseId(evaluation: evaluation): number {
    console.log('evaluation.defense?.idDef:', evaluation.defense?.idDef);
    console.log('historiqueDefenseArray:', this.historiqueDefenseArray);

    if (evaluation.defense?.idDef === undefined) {
        return -1; // Si idDef est undefined, retournez une valeur par défaut
    }

    const matchingHistoriqueDefense = this.historiqueDefenseArray.find(historiqueDefense => historiqueDefense.idDef === evaluation.defense?.idDef);
    if (matchingHistoriqueDefense) {
      return matchingHistoriqueDefense.idDef;
    } else {
      return -1; // Si aucune correspondance n'est trouvée, retournez une valeur par défaut (par exemple, -1)
    }
}*/


 /* fetchEvaluation(): void {
    this.evaluationService.getAllEvaluation().subscribe({
        next: (evaluations: evaluation[]) => {
            this.Evaluations = evaluations;
        },
        error: (error: any) => {
            console.error('Error fetching Evaluation', error);
        }
    });
}*/
fetchEvaluation(): void {
  this.evaluationService.getAllEvaluation().subscribe({
      next: (evaluations: evaluation[]) => {
          this.Evaluations = evaluations;
          this.Evaluations.forEach(evaluation => {
              // Mettre à jour numeroStockee pour chaque évaluation si nécessaire
             // evaluation.numeroStockee = evaluation.defense?.idDef ?? -1;
          });
      },
      error: (error: any) => {
          console.error('Error fetching Evaluation', error);
      }
  });
}

openUpdateDialogEval(evaluationId: number): void {
  const dialogRef = this.dialog.open(UpdateComponentt, {
    data: { evaluationId: evaluationId, ...this.Evaluations.find(evaluation => evaluation.id === evaluationId) }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.fetchEvaluation();
  });
}
deleteEvaluation(EvaluationId: number): void {
  if (window.confirm('Are you sure you want to delete this Evaluation?')) {
      this.evaluationService.deleteEvaluation(EvaluationId).pipe(
          tap(() => {
              this.Evaluations = this.Evaluations.filter(evaluation => evaluation.id !== EvaluationId);
          }),
          catchError(error => {
              console.error('Error deleting Evaluation:', error);
              throw error; // Rethrow the error to be caught by the subscriber
          })
      ).subscribe();
  }
}
getHistoriqueDefenseId(historiqueDefense: HistoriqueDefense): number {
  console.log('getHistoriqueDefenseId called with evaluation:', historiqueDefense);
  const matchingHistoriqueDefense = this.historiqueDefenseArray.find(historiqueDefense => historiqueDefense.idDef === historiqueDefense?.idDef);
  if (matchingHistoriqueDefense) {
    console.log('Matching historiqueDefense found:', matchingHistoriqueDefense);
    return matchingHistoriqueDefense.idDef;
  } else {
    console.log('No matching historiqueDefense found, returning -1');
    return -1;
  }
}

//searchTriggered = false; // Initialize searchTriggered flag to false

/*search(): void {
  console.log('Search function called with query:', this.query);
  if (!this.query) {
    this.historiqueDefenseArray = [];
    return;
  }

  this.defenceService.searchHistoriques(this.query).subscribe(
    historiques => {
      this.historiqueDefenseArray = historiques;
      console.log('Historique defense array updated with', this.historiqueDefenseArray.length, 'items');
      this.searchTriggered = true;
    },
    error => {
      console.error('Error searching historiques:', error);
    }
  );
}
*/
search(): void {
  console.log('Search function called with query:', this.query);
  if (!this.query) {
    this.historiqueDefenseArray = [];
    return;
  }

  this.defenceService.searchHistoriques(this.query).subscribe(
    historiques => {
      this.historiqueDefenseArray = historiques;
      console.log('Historique defense array updated with', this.historiqueDefenseArray.length, 'items');
      this.searchTriggered = true;
    },
    error => {
      console.error('Error searching historiques:', error);
    }
  );
}
checkForHistoriqueMatch(value: string, historiqueId: number) {
  this.defenceService.searchHistoriques(value).subscribe(
    (results) => {
      this.historiqueDefenseArray = results;
    },
    (error) => {
      console.error('Erreur lors de la recherche:', error);
    }
  );
}
private fetchChartData(): void {
  this.defenceService.getAllDefenses().subscribe({
      next: (data: any[]) => {
          if (!data || data.length === 0) {
              console.error('No data returned by the service');
              return;
          }

          // Group data by week
          const groupedData = data.reduce((acc, item) => {
              const weekNumber = this.getWeekNumber(new Date(item.dateDefense));
              if (!acc[weekNumber]) {
                  acc[weekNumber] = [];
              }
              acc[weekNumber].push(item);
              return acc;
          }, {});

          // Extract series data and labels from the grouped data
          const seriesData = Object.keys(groupedData).map(week => groupedData[week].length);
          const labels = Object.keys(groupedData);

          // Update chart options with the fetched data
          this.chartOptions.series = [{
              name: 'DefensesDate${weekNumber}',
              data: seriesData
          }];
          this.chartOptions.xaxis = {
              categories: labels
          };
      },
      error: (error) => {
          console.error('Error fetching defense statistics:', error);
      }
  });
}

private getWeekNumber(date: Date): string {
  const weekNumber = moment(date).isoWeek();
  return `Week ${weekNumber}`;
}


}
