import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CotizacionesRoutingModule } from './cotizaciones-routing.module';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { FormSharedModule } from '../form-components/form-components.module';
import { CotizadorEditarComponent } from './cotizador/cotizador-editar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule( {
  declarations: [ CotizadorComponent, CotizadorEditarComponent ],
  imports: [
    CotizacionesRoutingModule,
    CommonModule,
    FormSharedModule,
    ReactiveFormsModule,
    NgxExtendedPdfViewerModule
  ]
} )
export class CotizacionesModule {
}
