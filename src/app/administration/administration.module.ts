import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CargaDatosComponent } from './carga-datos/carga-datos.component';
import { FormSharedModule } from '../form-components/form-components.module';
import { AdministrationRoutingModule } from './administration-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosEditarComponent } from './usuarios/usuarios-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SedesComponent } from './sedes/sedes.component';
import { SedesEditarComponent } from './sedes/sedes-editar.component';
import { AsesoresComponent } from './sedes/asesores.component';
import { TipoVehiculoComponent } from './tiposVehiculos/tipoVehiculo.component';
import { TasaTipoVehiculoComponent } from './tiposVehiculos/tasaTipoVehiculo.component';
import { TipoVehiculoEditarComponent } from './tiposVehiculos/tipoVehiculo-editar.component';


@NgModule( {
  declarations: [
    CargaDatosComponent,
    UsuariosComponent,
    UsuariosEditarComponent,
    SedesComponent,
    SedesEditarComponent,
    AsesoresComponent,
    TipoVehiculoComponent,
    TasaTipoVehiculoComponent,
    TipoVehiculoEditarComponent
  ],
  exports: [],
    imports: [
        AdministrationRoutingModule,
        CommonModule,
        RouterModule,
        FormSharedModule,
        ReactiveFormsModule,
    ]
} )
export class AdministrationModule {
}
