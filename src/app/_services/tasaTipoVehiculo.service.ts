import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';
import { Observable } from 'rxjs';
import { TasaTipoVehiculo } from '../_modelos/tasaTipoVehiculo';

@Injectable( {
  providedIn: 'root'
} )
export class TasaTipoVehiculoService {
  private urlServicios = AppSettings.serviceUrl;
  private url = this.urlServicios + 'tasaTipoVehiculo';

  constructor( private httpClient: HttpClient ) {
  }

  public getById( id ) {
    return this.httpClient.get( this.url + '/' + id ).pipe( map( res => res as any ) );
  }

  public getByIdTipoVehiculo( id ) {
    return this.httpClient.get( this.url + '/tipoVehiculo/' + id ).pipe( map( res => res as any ) );
  }
  agregar( ttv: TasaTipoVehiculo ): Observable<TasaTipoVehiculo> {
    return this.httpClient.post( this.url, ttv ).pipe( map( res => res as TasaTipoVehiculo ) );
  }

  actualizar( ttv: TasaTipoVehiculo ): Observable<any> {
    return this.httpClient.put( this.url, ttv ).pipe( map( res => res as TasaTipoVehiculo ) );
  }
}
