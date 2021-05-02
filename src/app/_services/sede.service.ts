import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';
import { Usuario } from '../modelos/usuario';
import { Observable } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class SedeService {
  private urlServicios = AppSettings.serviceUrl + 'sede';

  constructor( private httpClient: HttpClient ) {
  }

  public getAll() {
    return this.httpClient.get( this.urlServicios ).pipe( map( res => res as any ) );
  }

  public getAllEnabled() {
    return this.httpClient.get( this.urlServicios + '/enabled' ).pipe( map( res => res as any ) );
  }

  public getById( id ) {
    return this.httpClient.get( this.urlServicios + '/' + id ).pipe( map( res => res as any ) );
  }

  agregar( usuario: Usuario ): Observable<Usuario> {
    return this.httpClient.post( this.urlServicios, usuario ).pipe( map( res => res as Usuario ) );
  }


  actualizar( usuario: Usuario ): Observable<any> {
    return this.httpClient.put( this.urlServicios, usuario ).pipe( map( res => res as Usuario ) );
  }
}
