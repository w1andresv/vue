import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable( { providedIn: 'root' } )
export class AuthGuard implements CanActivate {

  usuario: any;

  constructor( private router: Router,
               private authenticationService: AuthenticationService ) {
    this.usuario = this.authenticationService.obtenerUsuario();
  }

  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    if ( this.authenticationService.isLogin() ) {
      const url: string = route.url[ 0 ].path;
      if ( this.usuario.rol !== 'ADMIN' && url !== 'cotizador' ) {
        this.router.navigate( [ '/cotizador' ] );
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigate( [ '/login' ] );
      return false;
    }
  }
}
