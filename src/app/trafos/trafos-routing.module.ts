import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTrafoComponent } from './pages/list-trafo/list-trafo.component';
import { AddedittrafoComponent } from './pages/addedittrafo/addedittrafo.component';

const routes: Routes = [
  {
    path: '',
    component: ListTrafoComponent,
  },
  {
    path: 'edit/:id',
    component: AddedittrafoComponent,
  },
  {
    path: 'add',
    component: AddedittrafoComponent,
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
