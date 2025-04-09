import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddTaskComponent } from './pages/ui-components/task/add-task/add-task.component';
import { OfferComponent } from './pages/ui-components/company/offer/offer.component';
import { AddturninComponent } from './pages/ui-components/taskstudent/addturnin/addturnin.component';
import { AddmonitoringComponent } from './pages/ui-components/taskstudent/addturnin/turnIns/Addmonitoring/Addmonitoring.component';
import { MonitoringChartsComponent } from './pages/ui-components/taskstudent/addturnin/turnIns/MonitoringCharts/MonitoringCharts.component';
import { OfferfrontComponent } from './pages/client/components/offerfront/offerfront.component';
import { RequestfrontComponent } from './pages/client/components/offerfront/requestfront/requestfront.component';
import { DefenseComponent } from './pages/ui-components/defense/defense.component';
import { EvaluationComponent } from './pages/ui-components/evaluation/evaluation.component';
import { DefenseStudentComponent } from './pages/ui-components/defensestudent/defense-student.component';
const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"home"},
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/client/client.module').then((m) => m.ClientModule)
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
    ],
  },
  { path: 'components/offerfront/:id' ,component: OfferfrontComponent },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },
  {
    path: 'ui-components/offer/:id'
    ,component: OfferComponent
  },
  {
    path: 'components/requestfront/:id'
    ,component: RequestfrontComponent
  },
  {path: 'add-task',component: AddTaskComponent},
  {path: 'monitoring',component: AddmonitoringComponent},
  {path: 'add-turnin',component: AddturninComponent},
  {path: 'monitoringnotes',component: MonitoringChartsComponent},
  {path:'defense', component:DefenseComponent},
  {path:'evaluation', component:EvaluationComponent},
  {path:'DefenseStudent', component:DefenseStudentComponent},


  {path:'**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
