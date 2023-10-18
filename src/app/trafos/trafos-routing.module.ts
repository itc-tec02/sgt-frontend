import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTrafoComponent } from './pages/list-trafo/list-trafo.component';
import { EditTrafoComponent } from './pages/edit-trafo/edit-trafo.component';

const routes: Routes = [
  {
    path: '',
    component: ListTrafoComponent,
  },
  {
    path: 'edit/:id',
    component: EditTrafoComponent,
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
export class TrafosRoutingModule { }
