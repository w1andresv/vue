import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
} )
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  submitted = false;
  cargando = false;
  estado: any;

  constructor( private router: Router,
               private authenticationService: AuthenticationService,
               private formBuilder: FormBuilder,
               private appmain: AppComponent, ) {
  }

  ngOnInit() {
    const token = localStorage.getItem( 'token' );
    if ( token !== null ) {
      this.appmain.setSession( true );
      this.router.navigate( [ 'dashboard' ] );
    } else {
      this.appmain.setSession( false );
      this.formulario = this.formBuilder.group( {
        username: [ null, [ Validators.required ] ],
        password: [ null, [ Validators.required ] ]
      } );
    }
  }

  onSubmit() {
    if ( this.formulario.valid ) {
      this.cargando = true;
      const usuario = this.formulario.value;
      this.authenticationService.login( usuario.username, usuario.password ).subscribe( res => {
        if ( res.estado ) {
          localStorage.setItem( 'token', res.token );
          this.appmain.setSession( true );
          this.router.navigate( [ 'dashboard' ] );
          this.cargando = false;
        } else {
          this.estado = 'Usuario y/o contraseña incorectos.';
          localStorage.removeItem( 'token' );
          this.appmain.setSession( false );
          this.cargando = false;
        }
      } );
    }
  }
}
