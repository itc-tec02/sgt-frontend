import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PotenciasComponent } from './pages/potencias/potencias.component';
import { AddOrEditPotenciasComponent } from './pages/add-or-edit-potencias/add-or-edit-potencias.component';

const routes: Routes = [
  {
    path: '',
    component: PotenciasComponent,
  },
  // {
  //   path: 'edit/:id',
  //   component: AddOrEditPotenciasComponent,
  // },
  // {  path: 'add',
  // component: AddOrEditPotenciasComponent,
  // },
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