import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sede } from '../../_modelos/sede';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SedeService } from '../../_services/sede.service';
import { AsesorService } from '../../_services/asesor.service';

@Component( {
  selector: 'app-sedes-editar',
  templateUrl: './sedes-editar.component.html',
  styleUrls: [ './sedes-editar.component.css' ]
} )
export class SedesEditarComponent implements OnInit {

  @Input()
  listaSedes: Sede[] = [];
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  formulario: FormGroup;
  submitted = false;
  @Input()
  sede: Sede;
  show = 'T';

  constructor( private formBuilder: FormBuilder,
               private sedeService: SedeService,
               private asesorService: AsesorService ) {
  }

  ngOnInit() {
    this.cargarFormulario();
  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group( {
      _id: [ this.sede ? this.sede._id : null ],
      nombre: [ this.sede ? this.sede.nombre : null, [ Validators.required ] ],
      codigo: [ this.sede ? this.sede.codigo : null, [ Validators.required ] ],
      habilitado: [ this.sede ? this.sede.habilitado : true, [ Validators.required ] ],
      asesores: this.formBuilder.array( [] ),
    } );
    if ( !( this.sede && this.sede._id ) ) {
      this.agregarAsesor();
    }
  }

  get f() {
    return this.formulario.controls;
  }

  get controlesAsesores(): FormArray {
    const data = this.formulario.get( 'asesores' ) as FormArray;
    return data;
  }

  get controlesAsesoresTemp(): any {
    const data = this.formulario.get( 'asesores' ) as FormArray;
    return data;
  }


  onSubmit() {
    this.submitted = true;
    const data = this.formulario.value;
    const listaAsesores = [];
    if ( data.asesores.length > 0 ) {
      data.asesores.map( x => {
        x.codigoCargo = x.cargo ? x.cargo.substring( 0, 6 ) : null;
        listaAsesores.push( Object.assign( {}, x ) );
      } );
    }
    if ( this.formulario.valid ) {
      if ( data._id ) {
        this.sedeService.actualizar( data ).subscribe( res => {
          this.dismiss.emit( 'T' );
        }, error => {
          console.log( 'error al guardar' );
        } );
      } else {
        this.sedeService.agregar( data ).subscribe( res => {
          for ( const item of listaAsesores ) {
            item.sede = res._id;
            this.asesorService.agregar( item ).subscribe();
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

  agregarAsesor() {
    const asesor = this.formBuilder.group( {
      _id: [ null ],
      numeroDocumento: [ null, [ Validators.required ] ],
      nombre: [ null, [ Validators.required ] ],
      cargo: [ null, [ Validators.required ] ],
      habilitado: [ true, [ Validators.required ] ],
    } );
    this.controlesAsesores.push( asesor );
  }

  eliminarAsesor( index ) {
    this.controlesAsesores.removeAt( index );
  }

}
