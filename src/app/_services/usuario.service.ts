import { Injectable } from '@angular/core';
import { AppSettings } from '../../proyect.conf';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../modelos/usuario';

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {
  private urlServicios = AppSettings.serviceUrl + 'usuario';


  constructor( private httpClient: HttpClient, private autenticacionService: AuthenticationService ) {
  }

  listado(): Observable<Usuario[]> {
    return this.httpClient.get( this.urlServicios ).pipe( map( res => res as Usuario[] ) );
  }

  contador(): Observable<number> {
    return this.httpClient.get( this.urlServicios + '/contador' ).pipe( map( res => res as any ) );
  }

  obtenerPorId( idUsuario: number ): Observable<Usuario> {
    return this.httpClient.get( this.urlServicios + idUsuario ).pipe( map( res => res as Usuario ) );
  }

  agregar( usuario: Usuario ): Observable<Usuario> {
    return this.httpClient.post( this.urlServicios, usuario ).pipe( map( res => res as Usuario ) );
  }


  actualizar( usuario: Usuario ): Observable<any> {
    return this.httpClient.put( this.urlServicios, usuario ).pipe( map( res => res as Usuario ) );
  }
}
