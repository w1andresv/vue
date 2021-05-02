import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent {
  title = 'GIP Seguros';
  sessionStart: boolean;
  msgs: Message[] = [];

  constructor( private authenticationService: AuthenticationService,
               private router: Router, ) {
    this.sessionStart = this.authenticationService.isLogin();
    if ( !this.sessionStart ) {
      localStorage.removeItem( 'token' );
      this.router.navigate( [ '/login' ] );
    }
  }

  setSession( s: boolean ): void {
    this.sessionStart = s;
  }
}
