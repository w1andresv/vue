import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Router } from '@angular/router';
import { Message, PrimeNGConfig } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit{
  title = 'GIP Seguros';
  sessionStart: boolean;
  msgs: Message[] = [];

  constructor( private authenticationService: AuthenticationService,
               private router: Router,
               private config: PrimeNGConfig,
               private translateService: TranslateService,) {
    this.sessionStart = this.authenticationService.isLogin();
    if ( !this.sessionStart ) {
      localStorage.removeItem( 'token' );
      this.router.navigate( [ '/login' ] );
    }
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang( 'es' );
    this.translate( 'es' );
    }

  setSession( s: boolean ): void {
    this.sessionStart = s;
  }
  translate( lang: string ): void {
    this.translateService.use( lang );
    this.translateService.get( 'primeng' ).subscribe( ( res ) => {
      this.config.setTranslation( res );
    } );
  }
}
