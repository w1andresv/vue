import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../_modelos/usuario';
import { AuthenticationService } from '../../_services/authentication.service';
import { UsuarioService } from '../../_services/usuario.service';

@Component( {
  selector: 'app-usuarios-editar',
  templateUrl: './usuarios-editar.component.html',
  styleUrls: [ './usuarios-editar.component.css' ]
} )
export class UsuariosEditarComponent implements OnInit {


  formulario: FormGroup;
  submitted = false;
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  listaUsuarios: Usuario[] = [];
  @Input()
  usuario: Usuario;
  usuarioLogeado: any;
  listaRoles: any[] = [];
  eye = 'fa-eye-slash';
  eyeNew = 'fa-eye-slash';
  showPass = 'password';
  showConfim = 'password';

  constructor( private formBuilder: FormBuilder,
               private usuarioService: UsuarioService,
               private authenticationService: AuthenticationService, ) {
  }

  ngOnInit() {
    this.usuarioLogeado = this.authenticationService.obtenerUsuario();
    this.listaRoles.push( { value: 'ADMIN', label: 'Administrador' } );
    this.listaRoles.push( { value: 'USER', label: 'Usuario' } );
    this.cargarFormulario();

  }

  cargarFormulario() {
    this.formulario = this.formBuilder.group( {
      _id: [ this.usuario ? this.usuario._id : null ],
      nombre: [ this.usuario ? this.usuario.nombre : null, [ Validators.required ] ],
      email: [ this.usuario ? this.usuario.email : null ],
      usuarioSistema: [ this.usuario ? this.usuario.usuarioSistema : null, [ Validators.required ] ],
      habilitado: [ this.usuario ? this.usuario.habilitado : true, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      passwordConfirm: [ null, [ Validators.required ] ],
      rol: [ this.usuario ? this.usuario.rol : null, [ Validators.required ] ]
    } );
  }

  get f() {
    return this.formulario.controls;
  }

  show( type: boolean ) {
    if ( type ) {
      if ( this.showPass === 'password' ) {
        this.showPass = 'text';
        this.eye = 'fa-eye';
      } else {
        this.showPass = 'password';
        this.eye = 'fa-eye-slash';
      }
    } else {
      if ( this.showConfim === 'password' ) {
        this.showConfim = 'text';
        this.eyeNew = 'fa-eye';
      } else {
        this.showConfim = 'password';
        this.eyeNew = 'fa-eye-slash';
      }
    }

  }

  onSubmit() {
    this.submitted = true;
    const data = this.formulario.value;
    if ( this.formulario.valid ) {
      const usr = this.listaUsuarios.find( x => x.usuarioSistema.toUpperCase() === data.usuarioSistema.toUpperCase() );
      if ( ( usr && !data._id ) || ( usr && data._id !== usr._id ) ) {
        console.log( 'usuario existe' );
      } else {
        if ( data._id ) {
          this.usuarioService.actualizar( data ).subscribe( res => {
            this.dismiss.emit( 'T' );
          }, error => {
            console.log( 'error al guardar' );
          } );
        } else {
          this.usuarioService.agregar( data ).subscribe( res => {
            this.dismiss.emit( 'T' );
          }, error => {
            console.log( 'error al guardar' );
          } );
        }
      }
    }
  }

  atras() {
    this.dismiss.emit( 'T' );
  }
}
