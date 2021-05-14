import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';
import { Observable } from 'rxjs';
import { TipoVehiculo } from '../_modelos/tipoVehiculo';

@Injectable( {
  providedIn: 'root'
} )
export class TipoVehiculoService {
  private urlServicios = AppSettings.serviceUrl;
  private url = this.urlServicios + 'tipoVehiculo';

  constructor( private httpClient: HttpClient ) {
  }

  public getAll() {
    return this.httpClient.get( this.url ).pipe( map( res => res as any ) );
  }

  public getById( id ) {
    return this.httpClient.get( this.url + '/' + id ).pipe( map( res => res as any ) );
  }

  public getTasaTipoVehiculo( id ) {
    return this.httpClient.get( this.url + 'tasaTipoVehiculo/' + id ).pipe( map( res => res as any ) );
  }

  agregar( tv: TipoVehiculo ): Observable<TipoVehiculo> {
    return this.httpClient.post( this.url, tv ).pipe( map( res => res as TipoVehiculo ) );
  }

  actualizar( tv: TipoVehiculo ): Observable<any> {
    return this.httpClient.put( this.url, tv ).pipe( map( res => res as TipoVehiculo ) );
  }
}
