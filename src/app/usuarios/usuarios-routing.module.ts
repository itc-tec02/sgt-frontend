import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsuariosComponent } from './pages/list-usuarios/list-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: ListUsuariosComponent,
  },
  {
    path: 'edit/:id',
    component: ListUsuariosComponent,
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
export class UsuariosRoutingModule { }
