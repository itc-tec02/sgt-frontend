import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppLayoutComponent } from './layout/app.layout.component';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';
import { ListOrdenComponent } from './otts/pages/list-orden/list-orden.component';
import { ListTrafoComponent } from './trafos/pages/list-trafo/list-trafo.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ListPuestoComponent } from './puestos/pages/list-puesto/list-puesto.component';
import { PotenciasComponent } from './potencias/pages/potencias/potencias.component';
import { CrsComponent } from './crs/pages/crs/crs.component';
import { GruposComponent } from './grupos/pages/grupos/grupos.component';
import { ListUsuariosComponent } from './usuarios/pages/list-usuarios/list-usuarios.component';
import { AddOrEditPotenciasComponent } from './potencias/pages/add-or-edit-potencias/add-or-edit-potencias.component';
import { AddeditpuestoComponent } from './puestos/pages/addeditpuesto/addeditpuesto.component';
import { AddedittrafoComponent } from './trafos/pages/addedittrafo/addedittrafo.component';



const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: '',
    canActivate: [ isAuthenticatedGuard ],
    component: AppLayoutComponent,
    children:[
      { path: '', loadChildren: () => import('./layout/home/home.module').then( m => m.HomeModule) },
      { path:'trafo', component: ListTrafoComponent},
      { path:'trafo/edit/:id', component: AddedittrafoComponent},
      { path:'trafo/add', component: AddedittrafoComponent},
      { path:'puesto', component: ListPuestoComponent},
      { path:'puesto/edit/:id', component: AddeditpuestoComponent},
      { path:'puesto/add', component: AddeditpuestoComponent},
      { path:'ott', component: ListOrdenComponent},
      { path:'grupos', component: GruposComponent},
      { path:'cr', component: CrsComponent},
      { path:'cr/admsist', component: CrsComponent},
      { path:'potn', component: PotenciasComponent},
      { path:'potn/edit/:id', component: AddOrEditPotenciasComponent},
      { path:'potn/add', component: AddOrEditPotenciasComponent},
      { path:'sor', component: NotfoundComponent},
      { path:'users', component: ListUsuariosComponent},
      { path:'prfl', component: NotfoundComponent},
      { path:'user/pass', component: NotfoundComponent},
      //{ path:'notfound', component: NotfoundComponent},
      { path:'**', redirectTo: 'notfound'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
