import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable()
export class RequestsInterceptor implements HttpInterceptor {


  constructor( private authenticationService: AuthenticationService ) {
  }

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if ( !req.headers.has( 'Content-Type' ) ) {
      req = req.clone( { headers: req.headers.set( 'Content-Type', 'application/json' ) } );
    }
    const token = this.authenticationService.obtenerToken();
    req = this.agregarToken( req, token );
    return next.handle( req );
  }

  private agregarToken( request: HttpRequest<any>, token: string ) {
    return request.clone( {
      setHeaders: {
        Authorization: `${token}`
      }
    } );
  }


}
