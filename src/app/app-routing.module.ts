import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFountComponent } from './components/page-not-fount/page-not-fount.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ AuthGuard ] },
  { path: 'cot', loadChildren: () => import('./cotizaciones/cotizaciones.module').then( m => m.CotizacionesModule ) },
  {
    path: 'adm',
    loadChildren: () => import('./administration/administration.module').then( m => m.AdministrationModule )
  },
  { path: '**', component: PageNotFountComponent, canActivate: [ AuthGuard ] }
];

@NgModule( {
  imports: [ RouterModule.forRoot( routes ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule {
}
