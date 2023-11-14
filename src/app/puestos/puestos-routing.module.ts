import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPuestoComponent } from './pages/list-puesto/list-puesto.component';

const routes: Routes = [
  {
    path: '',
    component: ListPuestoComponent,
  },
  {
    path: 'edit/:id',
    component: ListPuestoComponent,
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
export class PuestosRoutingModule { }