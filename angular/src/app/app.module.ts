import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './pages/client/footer/footer.component';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './layouts/notification/notification.component';
import { NotificationRequestComponent } from './layouts/notification/notificationRequest/notificationRequest.component';
import { UpdateComponent } from './pages/ui-components/defense/updateDefence/update/update.component';
import { CreateComponent } from './pages/ui-components/defense/createdefense/create/create.component';
import {  FullCalendarModule } from '@fullcalendar/angular';
import { EvaluationComponent } from './pages/ui-components/evaluation/evaluation.component';
import { CreateComponentt } from './pages/ui-components/evaluation/create/create.component';
import { UpdateComponentt } from './pages/ui-components/evaluation/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    NotificationComponent,
    NotificationRequestComponent,UpdateComponent,CreateComponent,EvaluationComponent,CreateComponentt,UpdateComponentt  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    NgbModule,
    CommonModule,FullCalendarModule, 
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
