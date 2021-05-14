import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sede } from '../../_modelos/sede';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesorService } from '../../_services/asesor.service';
import { Asesor } from '../../_modelos/asesor';
import { TipoVehiculo } from '../../_modelos/tipoVehiculo';
import { TasaTipoVehiculoService } from '../../_services/tasaTipoVehiculo.service';

@Component( {
  selector: 'app-tasaTipoVehiculo',
  templateUrl: './tasaTipoVehiculo.component.html',
  styleUrls: [ './tasaTipoVehiculo.component.css' ]
} )
export class TasaTipoVehiculoComponent implements OnInit {


  @Input()
  tipoVehiculo: TipoVehiculo;
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  formulario: FormGroup;
  submitted = false;
  asesor: Asesor;
  listaAsesores: Asesor[] = [];
  show = 'T';
  cols: any;

  constructor( private formBuilder: FormBuilder,
               private tasaTipoVehiculoService: TasaTipoVehiculoService ) {
  }

  get f() {
    return this.formulario.controls;
  }

  ngOnInit() {
    this.cargarLista();
    this.cols = [
      { field: 'tasa', header: 'Tasa' },
      { field: 'modeloDesde', header: 'Modelo desde' },
      { field: 'modeloHasta', header: 'Modelo hasta' },
      { field: 'habilitado', header: 'Habilitado' },
      { field: 'def', header: 'Acciones' },
    ];
  }

  cargarLista() {
    this.listaAsesores = [];
    this.tasaTipoVehiculoService.getByIdTipoVehiculo( this.tipoVehiculo._id ).subscribe( res => {
      this.listaAsesores = res;
    } );
    this.cargarFormulario( null );
  }

  cargarFormulario( tipoVehiculo ) {
    this.formulario = this.formBuilder.group( {
      _id: [ tipoVehiculo ? tipoVehiculo._id : null ],
      tasa: [ tipoVehiculo ? tipoVehiculo.tasa : null, [ Validators.required ] ],
      tipoVehiculo: [ this.tipoVehiculo._id ],
      modeloDesde: [ tipoVehiculo ? tipoVehiculo.modeloDesde : null, [ Validators.required ] ],
      modeloHasta: [ tipoVehiculo ? tipoVehiculo.modeloHasta : null ],
      habilitado: [ tipoVehiculo ? tipoVehiculo.habilitado : true, [ Validators.required ] ],
    } );
  }

  onSubmit() {
    this.submitted = true;
    const data = this.formulario.value;
    if ( this.formulario.valid ) {
      if ( data._id ) {
        this.tasaTipoVehiculoService.actualizar( data ).subscribe( res => {
          this.mostrarOcultar( 'T', null );
          this.cargarLista();
        }, error => {
          console.log( 'error al guardar' );
        } );
        this.submitted = false;
      } else {
        this.tasaTipoVehiculoService.agregar( data ).subscribe( res => {
          this.mostrarOcultar( 'T', null );
          this.cargarLista();
        }, error => {
          console.log( 'error al guardar' );
        } );
        this.submitted = false;
      }
    }
  }

  atras() {
    this.dismiss.emit( 'T' );
  }

  agregar( event? ) {
    if ( event ) {
      this.asesor = event;
    }
    this.cargarFormulario( this.asesor );
    this.show = 'E';
  }

  inhabilitar( asesor ) {
    asesor.habilitado = false;
    this.actualizar( asesor );
  }

  actualizar( asesor ) {
    this.tasaTipoVehiculoService.actualizar( asesor ).subscribe( res => {
      this.cargarLista();
    }, error => {
      console.log( 'error al guardar' );
    } );

  }

  habilitar( asesor ) {
    asesor.habilitado = true;
    this.actualizar( asesor );
  }

  mostrarOcultar( event, asesor? ) {
    this.submitted = false;
    if ( event === 'E' ) {
      this.asesor = asesor;
      this.show = event;
    } else {
      this.asesor = asesor;
      this.show = event;
    }
  }

}
