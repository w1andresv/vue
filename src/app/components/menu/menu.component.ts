import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component( {
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: [ './menu.component.css' ]
} )
export class MenuComponent implements OnInit {

  usuario: any;

  constructor( private authenticationService: AuthenticationService ) {
  }

  ngOnInit() {
    this.usuario = this.authenticationService.obtenerUsuario();
  }

}
