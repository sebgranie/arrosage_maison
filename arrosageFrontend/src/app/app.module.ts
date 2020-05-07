import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JumbotronComponent } from './pages/jumbotron/jumbotron.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanningComponent } from './pages/planning/planning.component';
import { ReseauComponent } from './pages/reseau/reseau.component';
import { CreationProgrammeComponent } from './pages/programmes/creation-programme/creation-programme.component';
import { ModificationProgrammeComponent } from './pages/programmes/modification-programme/modification-programme.component';
import { SupressionProgrammeComponent } from './pages/programmes/supression-programme/supression-programme.component';
import { ProgrammesComponent } from './pages/programmes/programmes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    PlanningComponent,
    ReseauComponent,
    CreationProgrammeComponent,
    ModificationProgrammeComponent,
    SupressionProgrammeComponent,
    ProgrammesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
