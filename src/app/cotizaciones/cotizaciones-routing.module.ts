import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { AuthGuard } from '../_guards/auth.guard';


const routes: Routes = [
  { path: 'cotizador', component: CotizadorComponent, canActivate: [ AuthGuard ] },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CotizacionesRoutingModule {
}
