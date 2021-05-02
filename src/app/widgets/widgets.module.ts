import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSharedModule } from '../form-components/form-components.module';
import { CantidadCotizacionesComponent } from './cantidad-cotizaciones/cantidad-cotizaciones.component';

@NgModule( {
  declarations: [ CantidadCotizacionesComponent ],
  imports: [
    CommonModule,
    FormSharedModule,
  ],
  exports: [
    CantidadCotizacionesComponent
  ]
} )
export class WidgetsModule {
}
