import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { PersonsComponent } from './modules/persons/persons.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'persons/:id', component: PersonsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
