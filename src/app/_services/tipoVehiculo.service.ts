import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppSettings } from '../../proyect.conf';

@Injectable( {
  providedIn: 'root'
} )
export class TipoVehiculoService {
  private urlServicios = AppSettings.serviceUrl ;
  private url = this.urlServicios + 'tipoVehiculo';

  constructor( private http: HttpClient ) {
  }

  public getAll() {
    return this.http.get( this.url ).pipe( map( res => res as any ) );
  }

  public getById( id ) {
    return this.http.get( this.url + '/' + id ).pipe( map( res => res as any ) );
  }

  public getTasaTipoVehiculo( id ) {
    return this.http.get( this.url + 'tasaTipoVehiculo/' + id ).pipe( map( res => res as any ) );
  }
}
