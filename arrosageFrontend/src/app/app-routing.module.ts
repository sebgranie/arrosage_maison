import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanningComponent } from './pages/planning/planning.component';
import { ReseauComponent } from './pages/reseau/reseau.component';
import { ProgrammesComponent } from './pages/programmes/programmes.component';
import { ModificationProgrammeComponent } from './pages/programmes/modification-programme/modification-programme.component';
import { CreationProgrammeComponent } from './pages/programmes/creation-programme/creation-programme.component';
import { SupressionProgrammeComponent } from './pages/programmes/supression-programme/supression-programme.component';

const routes: Routes = [
  { path: 'planning', component: PlanningComponent },
  { path: 'reseau', component: ReseauComponent },
  { path: 'programmes', component: ProgrammesComponent },
  { path: 'modification-programme', component: ModificationProgrammeComponent },
  { path: 'creation-programme', component: CreationProgrammeComponent },
  { path: 'supression-programme', component: SupressionProgrammeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
