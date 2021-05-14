import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { AuthenticationService } from '../../_services/authentication.service';
import { Usuario } from '../../_modelos/usuario';

@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.css' ]
} )
export class HeaderComponent implements OnInit {

  usuarioLogueado: Usuario;

  constructor( private router: Router,
               private appmain: AppComponent,
               private authenticationService: AuthenticationService ) {
  }

  ngOnInit() {
    this.usuarioLogueado = this.authenticationService.obtenerUsuario();
  }

  redirigir() {
    this.router.navigate( [ '/dashboard' ] );
  }

  cerrarSesion() {
    localStorage.removeItem( 'token' );
    this.appmain.setSession( false );
    this.router.navigate( [ '/' ] );
  }
}
