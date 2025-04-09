import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { VideoComponent } from './video/video.component';
import { ComplaintfrontComponent } from './components/complaintfront/complaintfront.component';
import { CompanyfrontComponent } from './components/companyfront/companyfront.component';
import { EventfrontComponent } from './components/eventfront/eventfront.component';
import { OfferfrontComponent } from './components/offerfront/offerfront.component';
import { ResponseComponent } from '../ui-components/complaint/response/response.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: VideoComponent },
      { path: 'complaint', component: ComplaintfrontComponent },
      { path: 'response', component: ResponseComponent },
      { path: 'components/offerfront/:id' ,component: OfferfrontComponent },
      { path: 'company', component: CompanyfrontComponent },
      { path: 'events', component: EventfrontComponent },
      { path: '**', component: VideoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
