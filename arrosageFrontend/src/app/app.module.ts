import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JumbotronComponent } from './pages/jumbotron/jumbotron.component';
import { FormsModule } from '@angular/forms';
import { PlanningComponent } from './pages/planning/planning.component';
import { ReseauComponent } from './pages/reseau/reseau.component';
import { CreationProgrammeComponent } from './pages/programmes/creation-programme/creation-programme.component';
import { ModificationProgrammeComponent } from './pages/programmes/modification-programme/modification-programme.component';
import { SupressionProgrammeComponent } from './pages/programmes/supression-programme/supression-programme.component';
import { ProgrammesComponent } from './pages/programmes/programmes.component';

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
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
