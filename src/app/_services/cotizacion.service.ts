import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';

@Injectable( {
  providedIn: 'root'
} )
export class CotizacionService {
  private urlServicios = AppSettings.serviceUrl;
  private url = this.urlServicios + 'cotizacion';

  constructor( private http: HttpClient ) {
  }

  public getAll() {
    return this.http.get( this.url ).pipe( map( res => res as any ) );
  }

  public agregar( cotizacion ) {
    return this.http.post( this.url, cotizacion ).pipe( map( res => res as any ) );
  }

  public actualizar( cotizacion ) {
    return this.http.put( this.url, cotizacion ).pipe( map( res => res as any ) );
  }

  public getById( id ) {
    return this.http.get( this.url + '/' + id ).pipe( map( res => res as any ) );
  }

}
