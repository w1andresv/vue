import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesorService } from '../../_services/asesor.service';
import { TipoVehiculo } from '../../_modelos/tipoVehiculo';
import { TipoVehiculoService } from '../../_services/tipoVehiculo.service';
import { TasaTipoVehiculoService } from '../../_services/tasaTipoVehiculo.service';

@Component( {
  selector: 'app-tipoVehiculo-editar',
  templateUrl: './tipoVehiculo-editar.component.html',
  styleUrls: [ './tipoVehiculo-editar.component.css' ]
} )
export class TipoVehiculoEditarComponent implements OnInit {

  @Input()
  listaSedes: TipoVehiculo[] = [];
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  formulario: FormGroup;
  submitted = false;
  @Input()
  tipoVehiculo: TipoVehiculo;
  show = 'T';

  constructor( private formBuilder: FormBuilder,
               private tipoVehiculoService: TipoVehiculoService,
               private tasaTipoVehiculoService: TasaTipoVehiculoService ) {
  }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group( {
      _id: [ this.tipoVehiculo ? this.tipoVehiculo._id : null ],
      nombre: [ this.tipoVehiculo ? this.tipoVehiculo.nombre : null, [ Validators.required ] ],
      codigo: [ this.tipoVehiculo ? this.tipoVehiculo.codigo : null, [ Validators.required ] ],
      habilitado: [ this.tipoVehiculo ? this.tipoVehiculo.habilitado : true, [ Validators.required ] ],
      tasas: this.formBuilder.array( [] ),
    } );
    if ( !( this.tipoVehiculo && this.tipoVehiculo._id ) ) {
      this.agregarTasa();
    }
  }

  get f() {
    return this.formulario.controls;
  }

  get controlesTasas(): FormArray {
    const data = this.formulario.get( 'tasas' ) as FormArray;
    return data;
  }

  get controlesTasasTemp(): any {
    const data = this.formulario.get( 'tasas' ) as FormArray;
    return data;
  }


  onSubmit() {
    this.submitted = true;
    const data = this.formulario.value;
    const listaTasas = [];
    if ( data.tasas.length > 0 ) {
      data.tasas.map( x => {
        listaTasas.push( Object.assign( {}, x ) );
      } );
    }
    if ( this.formulario.valid ) {
      if ( data._id ) {
        this.tipoVehiculoService.actualizar( data ).subscribe( res => {
          this.dismiss.emit( 'T' );
        }, error => {
          console.log( 'error al guardar' );
        } );
      } else {
        this.tipoVehiculoService.agregar( data ).subscribe( res => {
          for ( const item of listaTasas ) {
            item.tipoVehiculo = res._id;
            this.tasaTipoVehiculoService.agregar( item ).subscribe();
          }
          this.dismiss.emit( 'T' );
        }, error => {
          console.log( 'error al guardar' );
        } );
      }
    }
  }

  atras() {
    this.dismiss.emit( 'T' );
  }

  agregarTasa() {
    const tasa = this.formBuilder.group( {
      _id: [ null ],
      tasa: [ null, [ Validators.required ] ],
      modeloDesde: [ null, [ Validators.required ] ],
      modeloHasta: [ null, [ Validators.required ] ],
      habilitado: [ true, [ Validators.required ] ],
    } );
    this.controlesTasas.push( tasa );
  }

  eliminarTasa( index ) {
    this.controlesTasas.removeAt( index );
  }

}
