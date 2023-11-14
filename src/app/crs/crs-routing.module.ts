import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrsComponent } from './pages/crs/crs.component';

const routes: Routes = [
  {
    path: '',
    component: CrsComponent,
  },
  {
    path: 'edit/:id',
    component: CrsComponent,
  },
  {
    path: 'admsist',
    component: CrsComponent,
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
export class CrsRoutingModule { }