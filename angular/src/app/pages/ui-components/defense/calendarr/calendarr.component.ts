import { ChangeDetectorRef, Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'; // Assurez-vous que cela est importé
import interactionPlugin from '@fullcalendar/interaction';
import { HttpClient } from '@angular/common/http';
import { DefenceService } from 'src/app/services/defence.service';
import { MatDialog } from '@angular/material/dialog';
import { defense } from 'src/app/core/Defense';

@Component({
  selector: 'app-calendarr',
  templateUrl: './calendarr.component.html',
  styleUrls: ['./calendarr.component.scss']
})
export class CalendarrComponent {
  calendarPlugins = [dayGridPlugin];
  defences: defense[];

  calendarEvents: any[] = [];
  calendarOptions: any = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin], // Ajoutez timeGridPlugin pour les vues horaires
    initialView: 'timeGridWeek', // Vous pouvez changer cette vue pour 'dayGridMonth', 'timeGridDay', etc.
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: this.calendarEvents
  };

  transformDataToEvents(): void {
    this.calendarEvents = this.defences.map((def) => {
      const startDate = new Date(def.dateDefense);
      const endDate = new Date(startDate.getTime()); // Créez une nouvelle instance de date pour l'heure de fin
      // Supposons que chaque défense dure 1 heure pour cet exemple
      endDate.setHours(startDate.getHours() + 1);

      return {
        title: `Défense ${def.idDef} ${def.timeDefense} nomDeEncadrent: ${def.nomDeEncadrent} `,
        start: startDate.toISOString(),
        end: endDate.toISOString()
      };
    });
  }

  private initializeCalendarOptions(): void {
    this.calendarOptions = {
      // Vos options de calendrier, y compris les événements: this.calendarEvents
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: this.calendarEvents
    };
  }

  constructor(private http: HttpClient, private defenceService: DefenceService, private dialog: MatDialog,private cdr: ChangeDetectorRef) {


  }
  ngOnInit() {
    console.log('On init....');
    //this.defenceService.getAllDefence().subscribe((data: defense[]) => {
      //this.defences = data;
    this.fetchDefense() ;
   // this.getHistoriqueDefenseId(evaluation) ;
  // this.loadHistoriqueDefenses()   ;
 //  this.historiqueDefenseArray = [];

 }

  fetchDefense(): void {
    this.defenceService.getAllDefenses().subscribe({
        next: (evaluations: defense[]) => {
            this.defences = evaluations;
            this.transformDataToEvents();
            this.initializeCalendarOptions();
            this.defences.forEach(defense => {
                // Mettre à jour numeroStockee pour chaque évaluation si nécessaire
               // evaluation.numeroStockee = evaluation.defense?.idDef ?? -1;
            });
        },
        error: (error: any) => {
            console.error('Error fetching Evaluation', error);
        }
    });
  }
}
