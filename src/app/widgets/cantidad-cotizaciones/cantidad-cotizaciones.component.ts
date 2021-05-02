import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../_services/cotizacion.service';

@Component( {
  selector: 'app-cantidad-cotizaciones',
  templateUrl: './cantidad-cotizaciones.component.html',
  styleUrls: [ './cantidad-cotizaciones.component.css' ]
} )
export class CantidadCotizacionesComponent implements OnInit {

  numeroCorizaciones = 0;

  constructor( private cotizacionService: CotizacionService ) {
  }

  ngOnInit() {
    this.cotizacionService.getAll().subscribe( res => {
      this.numeroCorizaciones = res.length;
    } );
  }

}
