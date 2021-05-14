import { Component, OnInit } from '@angular/core';
import { TipoVehiculo } from '../../_modelos/tipoVehiculo';
import { TipoVehiculoService } from '../../_services/tipoVehiculo.service';

@Component( {
  selector: 'app-tipoVehiculo',
  templateUrl: './tipoVehiculo.component.html',
  styleUrls: [ './tipoVehiculo.component.css' ]
} )
export class TipoVehiculoComponent implements OnInit {

  cols: any[];
  listaTiposVehiculos: TipoVehiculo[] = [];
  show = 'T';
  tipoVehiculo: TipoVehiculo;

  constructor( private tipoVehiculoService: TipoVehiculoService ) {
  }

  ngOnInit() {
    this.cargarLista();
    this.cols = [
      { field: 'codigoSede', header: 'Codigo' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'habilitado', header: 'Habilitado' },
      { field: 'def', header: 'Acciones' },
    ];
  }

  cargarLista() {
    this.tipoVehiculoService.getAll().subscribe( res => {
      this.listaTiposVehiculos = res;
    } );
  }

  agregar( event? ) {
    if ( event ) {
      this.tipoVehiculo = event;
    }
    this.show = 'E';
  }

  inhabilitar( tipoVehiculo ) {
    tipoVehiculo.habilitado = false;
    this.actualizar( tipoVehiculo );
  }

  actualizar( tipoVehiculo ) {
    this.tipoVehiculoService.actualizar( tipoVehiculo ).subscribe( res => {
      this.cargarLista();
    }, error => {
      console.log( 'error al guardar' );
    } );
  }

  habilitar( tipoVehiculo ) {
    tipoVehiculo.habilitado = true;
    this.actualizar( tipoVehiculo );
  }

  verTasas( tipoVehiculo ) {
    this.tipoVehiculo = tipoVehiculo;
    this.show = 'TA';
  }

  mostrarOcultar( event ) {
    this.show = event;
    this.tipoVehiculo = undefined;
    if ( event === 'T' ) {
      this.cargarLista();
    }
  }

}
