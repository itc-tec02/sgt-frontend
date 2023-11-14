import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotenciasComponent } from './pages/potencias/potencias.component';

const routes: Routes = [
  {
    path: '',
    component: PotenciasComponent,
  },
  {
    path: 'edit/:id',
    component: PotenciasComponent,
  },
  {
    path:'**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotenciasRoutingModule { }