import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AppSettings } from '../../proyect.conf';

@Injectable( {
  providedIn: 'root'
} )
export class TasaTipoVehiculoService {
  private urlServicios = AppSettings.serviceUrl;
  private url = this.urlServicios + 'tasaTipoVehiculo';

  constructor( private http: HttpClient ) {
  }

  public getById( id ) {
    return this.http.get( this.url + '/' + id ).pipe( map( res => res as any ) );
  }

  public getByIdTipoVehiculo( id ) {
    return this.http.get( this.url + '/tipoVehiculo/' + id ).pipe( map( res => res as any ) );
  }
}
