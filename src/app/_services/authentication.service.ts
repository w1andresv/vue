import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AppSettings } from '../../proyect.conf';

@Injectable( {
  providedIn: 'root'
} )
export class AuthenticationService {
  private urlServicios = AppSettings.serviceUrl;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public rutaServicios = this.urlServicios + 'login';
  private jwtHelper: JwtHelperService = new JwtHelperService();
  public token: string;
  public usuarioLogueado: any;

  constructor( private http: HttpClient ) {
    this.currentUserSubject = new BehaviorSubject<any>( JSON.parse( localStorage.getItem( 'currentUser' ) ) );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login( username: string, password: string ) {
    return this.http.post<any>( this.rutaServicios + `/`, { username, password } )
      .pipe( map( user => {
        return user;
      } ) );
  }

  logout() {
    localStorage.removeItem( 'token' );
    this.currentUserSubject.next( null );
  }

  isLogin() {
    const token = localStorage.getItem( 'token' );
    if ( !token ) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired( token );
    }
  }

  obtenerToken() {
    return localStorage.getItem( 'token' );
  }

  obtenerUsuario() {
    const token = localStorage.getItem( 'token' );
    if ( token !== null ) {
      const decoded = this.jwtHelper.decodeToken( token );
      this.usuarioLogueado = decoded.usuario;
    } else {
      console.log( 'No existe token de sesión.' );
      this.usuarioLogueado = null;
    }
    return this.usuarioLogueado;
  }
}
