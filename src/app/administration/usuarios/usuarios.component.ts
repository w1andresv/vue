import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../_services/usuario.service';

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.css' ]
} )
export class UsuariosComponent implements OnInit {
  cols: any;
  listaUsuarios: Usuario[] = [];
  show = 'T';
  usuario: Usuario;

  constructor( private usuarioService: UsuarioService ) {
  }

  ngOnInit() {
    this.cargarLista();
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'usuarioSistema', header: 'Usuario' },
      { field: 'correo', header: 'Correo' },
      { field: 'rol', header: 'Rol' },
      { field: 'habilitado', header: 'Habilitado' },
      { field: 'def', header: 'Acciones' },
    ];
  }

  cargarLista() {
    this.usuarioService.listado().subscribe( res => {
      this.listaUsuarios = res;
    } );
  }

  agregar( event? ) {
    if ( event ) {
      this.usuario = event;
    }
    this.show = 'E';
  }

  inhabilitar( usuario ) {
    usuario.habilitado = false;
    this.actualizar( usuario );
  }

  actualizar( usuario ) {
    this.usuarioService.actualizar( usuario ).subscribe( res => {
      this.cargarLista();
    }, error => {
      console.log( 'error al guardar' );
    } );
  }

  habilitar( usuario ) {
    usuario.habilitado = true;
    this.actualizar( usuario );
  }

  mostrarOcultar( event ) {
    this.show = event;
    this.usuario = undefined;
    if ( event === 'T' ) {
      this.cargarLista();
    }
  }
}
