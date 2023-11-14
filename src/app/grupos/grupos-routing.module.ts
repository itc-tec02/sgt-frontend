import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GruposComponent } from './pages/grupos/grupos.component';

const routes: Routes = [
  {
    path: '',
    component: GruposComponent,
  },
  {
    path: 'edit/:id',
    component: GruposComponent,
  },
  {
    path: 'admsist',
    component: GruposComponent,
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
export class GrupoRoutingModule { }