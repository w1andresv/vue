import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sede } from '../../modelos/sede';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsesorService } from '../../_services/asesor.service';
import { Asesor } from '../../modelos/asesor';

@Component( {
  selector: 'app-asesores',
  templateUrl: './asesores.component.html',
  styleUrls: [ './asesores.component.css' ]
} )
export class AsesoresComponent implements OnInit {


  @Input()
  sede: Sede;
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  formulario: FormGroup;
  submitted = false;
  asesor: Asesor;
  listaAsesores: Asesor[] = [];
  show = 'T';
  cols: any;

  constructor( private formBuilder: FormBuilder,
               private asesorService: AsesorService ) {
  }

  ngOnInit() {
    this.cargarLista();
    this.cols = [
      { field: 'numeroDocumento', header: 'Numero documento' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'cargo', header: 'cargo' },
      { field: 'habilitado', header: 'Habilitado' },
      { field: 'def', header: 'Acciones' },
    ];
  }

  cargarLista() {
    this.listaAsesores = [];
    this.asesorService.getByIdSede( this.sede.id ).subscribe( res => {
      this.listaAsesores = res;
    } );
  }

  cargarFormulario( asesor ) {
    this.formulario = this.formBuilder.group( {
      id: [ asesor ? asesor.id : null ],
      numeroDocumento: [ asesor ? asesor.numeroDocumento : null, [ Validators.required ] ],
      idSede: [ this.sede.id ],
      nombre: [ asesor ? asesor.nombre : null, [ Validators.required ] ],
      cargo: [ asesor ? asesor.cargo : null, [ Validators.required ] ],
      habilitado: [ asesor ? asesor.habilitado : true, [ Validators.required ] ],
      codigoCargo: [ asesor ? asesor.codigoCargo : null ],
    } );
  }

  get f() {
    return this.formulario.controls;
  }

  onSubmit() {
    this.submitted = true;
    const data = this.formulario.value;
    if ( this.formulario.valid ) {
      data.codigoCargo = data.cargo.length > 6 ? data.cargo.substring( 0, 6 ) : data.cargo;
      if ( data.id ) {
        this.asesorService.actualizar( data ).subscribe( res => {
          this.mostrarOcultar( 'T', null );
          this.cargarLista();
        }, error => {
          console.log( 'error al guardar' );
        } );
        this.submitted = false;
      } else {
        this.asesorService.agregar( data ).subscribe( res => {
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
    this.asesorService.actualizar( asesor ).subscribe( res => {
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
