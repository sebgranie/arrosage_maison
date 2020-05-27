import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { ProgrammeService } from './pages/programmes/programme.service';
import { PlanningService } from './pages/planning/planning.service';
import { ReseauService } from './pages/reseau/reseau.service';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from './pages/login/login.component';
import { FeedComponent } from './pages/feed/feed.component';

const firebaseConfig = {
  apiKey: "AIzaSyBiqG-OsmhcboX5pmdbEwcY55C1zi-BbXw",
  authDomain: "arrosagemaison.firebaseapp.com",
  databaseURL: "https://arrosagemaison.firebaseio.com",
  projectId: "arrosagemaison",
  storageBucket: "arrosagemaison.appspot.com",
  messagingSenderId: "225135513809",
  appId: "1:225135513809:web:8f5029de09d264c6c535f0"
}

@NgModule({
  declarations: [
    AppComponent,
    PlanningComponent,
    ReseauComponent,
    CreationProgrammeComponent,
    ModificationProgrammeComponent,
    SupressionProgrammeComponent,
    ProgrammesComponent,
    LoginComponent,
    FeedComponent
  ],
  imports: [
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
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
  providers: [ProgrammeService, PlanningService, ReseauService],
  bootstrap: [AppComponent],
  entryComponents: [CreationProgrammeComponent, ModificationProgrammeComponent]
})
export class AppModule { }
