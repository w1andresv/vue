import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component( {
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
} )
export class MenuComponent implements OnInit {

  usuario: any;

  constructor( private router: Router,
               private appmain: AppComponent,
               private authenticationService: AuthenticationService ) {
  }

  ngOnInit() {
    this.usuario = this.authenticationService.obtenerUsuario();
  }

  cerrarSesion() {
    localStorage.removeItem( 'token' );
    this.appmain.setSession( false );
    this.router.navigate( [ '/' ] );
  }
}
