import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListOrdenComponent } from './pages/list-orden/list-orden.component';
import { EditOrdenComponent } from './pages/edit-orden/edit-orden.component';

const routes: Routes = [
  {
    path: '',
    component: ListOrdenComponent,
  },
  {
    path:'edit/:id',
    component: EditOrdenComponent,
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
export class OttsRoutingModule { }
