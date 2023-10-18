import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppLayoutComponent } from './layout/app.layout.component';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';
import { ListOrdenComponent } from './otts/pages/list-orden/list-orden.component';
import { ListTrafoComponent } from './trafos/pages/list-trafo/list-trafo.component';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';



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
      { path:'puesto', component: NotfoundComponent},
      { path:'ott', component: ListOrdenComponent},
      { path:'grupos', component: NotfoundComponent},
      { path:'cr', component: NotfoundComponent},
      { path:'potn', component: NotfoundComponent},
      { path:'sor', component: NotfoundComponent},
      { path:'users', component: NotfoundComponent},
      { path:'prfl', component: NotfoundComponent},
      { path:'user/pass', component: NotfoundComponent},
      { path:'notfound', component: NotfoundComponent},
      { path:'**', redirectTo: 'notfound'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
