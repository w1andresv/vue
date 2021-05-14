import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SedesComponent } from './sedes/sedes.component';
import { TipoVehiculoComponent } from './tiposVehiculos/tipoVehiculo.component';


const admRoutes: Routes = [

  { path: 'cargar-datos', component: CargaDatosComponent, canActivate: [ AuthGuard ] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [ AuthGuard ] },
  { path: 'sedes', component: SedesComponent, canActivate: [ AuthGuard ] },
  { path: 'tipos-vehiculos', component: TipoVehiculoComponent, canActivate: [ AuthGuard ] },

];

@NgModule( {
  imports: [
    RouterModule.forChild( admRoutes )
  ],
  exports: [
    RouterModule
  ]
} )
export class AdministrationRoutingModule {
}
