import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';
import { Observable } from 'rxjs';
import { Asesor } from '../modelos/asesor';

@Injectable( {
  providedIn: 'root'
} )
export class AsesorService {

  private urlServicios = AppSettings.serviceUrl + 'asesor';

  constructor( private httpClient: HttpClient ) {
  }

  public getAll() {
    return this.httpClient.get( this.urlServicios ).pipe( map( res => res as any ) );
  }

  public getById( id ) {
    return this.httpClient.get( this.urlServicios + '/' + id ).pipe( map( res => res as any ) );
  }

  public getByIdSede( id ) {
    return this.httpClient.get( this.urlServicios + '/sede/' + id ).pipe( map( res => res as any ) );
  }

  public getByIdSedeEnabled( id ) {
    return this.httpClient.get( this.urlServicios + '/sede/' + id + '/enabled' ).pipe( map( res => res as any ) );
  }

  agregar( asesor: Asesor ): Observable<Asesor> {
    return this.httpClient.post( this.urlServicios, asesor ).pipe( map( res => res as Asesor ) );
  }


  actualizar( asesor: Asesor ): Observable<any> {
    return this.httpClient.put( this.urlServicios, asesor ).pipe( map( res => res as Asesor ) );
  }
}
