import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isNotAuthenticatedGuard, isAuthenticatedGuard } from './auth/guards';
import { AppLayoutComponent } from './layout/app.layout.component';
import { DashboardLayoutComponent } from './dashboard/layouts/dashboard-layout/dashboard-layout.component';


const routes: Routes = [
  {
    path: 'auth',
    canActivate: [ isNotAuthenticatedGuard ],
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
  },
  {
    path: '',
    // canActivate: [ isAuthenticatedGuard ],
    component: AppLayoutComponent,
    children:[
      { path: '', loadChildren: () => import('./layout/home/home.module').then( m => m.HomeModule) },
      { path:'trafo', component: DashboardLayoutComponent},
      { path:'puesto', component: DashboardLayoutComponent},
      { path:'ott', component: DashboardLayoutComponent},
      { path:'grupos', component: DashboardLayoutComponent},
      { path:'cr', component: DashboardLayoutComponent},
      { path:'potn', component: DashboardLayoutComponent},
      { path:'sor', component: DashboardLayoutComponent},
      { path:'users', component: DashboardLayoutComponent},
      { path:'prfl', component: DashboardLayoutComponent},
      { path:'user/pass', component: DashboardLayoutComponent},
      { path:'**', redirectTo: ''},
    ]
  },
  {
    path: '**',
    redirectTo: ''
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
