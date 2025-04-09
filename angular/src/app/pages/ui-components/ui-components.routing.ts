import { Routes } from '@angular/router';

// ui
import { CompanyComponent } from './company/company.component';
import { UserComponent } from './user/user.component';
import { DefenseComponent } from './defense/defense.component';
import { TaskComponent } from './task/task.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { InternshipComponent } from './internship/internship.component';
import { EventComponent } from './event/event.component';

import { AddTaskComponent } from './task/add-task/add-task.component';
import { ChatComponent } from './Chat/Chat.component';
import { TaskstudentComponent } from './taskstudent/taskstudent.component';
import { AddturninComponent } from './taskstudent/addturnin/addturnin.component';
import { TurnInsComponent } from './taskstudent/addturnin/turnIns/turnIns.component';
import { AddmonitoringComponent } from './taskstudent/addturnin/turnIns/Addmonitoring/Addmonitoring.component';
import { MonitoringChartsComponent } from './taskstudent/addturnin/turnIns/MonitoringCharts/MonitoringCharts.component';
import { RequestComponent } from './request/request.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { DefenseStudentComponent } from './defensestudent/defense-student.component';
import { ClassificationComponent } from './document/classification/classification.component';
import { DataminingComponent } from './document/datamining/datamining.component';
import { StatsComponent } from './document/stats/stats.component';
import { AddInternshipComponent } from './internship/add-internship/add-internship.component';
import { UpdateInternshipComponent } from './internship/update-internship/update-internship.component';
import { AddDocumentComponent } from './document/add-document/add-document.component';
import { UpdateDocumentComponent } from './document/update-document/update-document.component';
import { PlagiarismResultModalComponent } from './plagiarism-result-modal/plagiarism-result-modal.component';

export const UiComponentsRoutes: Routes = [
  { path: 'plagiarism-results', component: PlagiarismResultModalComponent },
  { path: 'stats', component: StatsComponent },
  {
    path: '',
    children: [
      {
        path: 'update-document/:id', 
        component: UpdateDocumentComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'add-document', 
        component: AddDocumentComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'update-internship/:id', 
        component: UpdateInternshipComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'add-internship', 
        component: AddInternshipComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'stats', 
        component: StatsComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'DataMining', 
        component: DataminingComponent,
      },
    
    ],
  },
  {
    path: '',
    children: [
      {
        path: 'Classification', 
        component: ClassificationComponent,
      },
    
    ],
  },
  
  {
    path: '',
    children: [
      {
        path: 'defense',
        component: DefenseComponent,
      },{
        path: 'evaluation',
        component: EvaluationComponent,
      },
      {
        path: 'company',
        component: CompanyComponent,
      },
      {
        path: 'requests',
        component: RequestComponent,
      },
      {
        path: 'task',
        component: TaskComponent,
      },
      {
        path: 'complaint',
        component: ComplaintComponent,
      },
      {
        path: 'internship',
        component: InternshipComponent,
      },
      {
        path: 'event',
        component: EventComponent,
      },
      {
        path: 'user',
        component: UserComponent,
      },
      {
        path: 'interview',
        component: InternshipComponent,
      },
     
      {
      path: 'add-task',
      component: AddTaskComponent,
      },
      {
        path: 'chat',
        component: ChatComponent,
      },
      {
        path: 'taskstudent',
        component: TaskstudentComponent,
      },
      {
        path: 'turnin',
        component: AddturninComponent,
      },
      {
        path: 'turnins',
        component: TurnInsComponent,
      },
      {
        path: 'monitoring',
        component: AddmonitoringComponent,
      },
      {
        path: 'monitoringnotes',
        component: MonitoringChartsComponent,
      },
      {
        path: 'defensestudent',
        component: DefenseStudentComponent,
      },
    ],
  },
];
