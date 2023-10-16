import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './pages/list-trafo/list-trafo.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    // children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrafosRoutingModule { }
