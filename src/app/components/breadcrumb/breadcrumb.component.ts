import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

/**
 * This component shows a breadcrumb trail for available routes the router can navigate to.
 * It subscribes to the router in order to update the breadcrumb trail as you navigate to a component.
 */
@Component( {
  selector: 'sd-breadcrumb',
  templateUrl: 'breadcrumb-component.html',

} )
export class BreadcrumbComponent implements OnInit, OnChanges, OnDestroy {
  @Input() useBootstrap = true;
  @Input() prefix = '';

  public _urls: string[];
  public _routerSubscription: any;

  constructor( private router: Router,
               private breadcrumbService: BreadcrumbService ) {
  }

  ngOnInit(): void {
    this.setAllFriendlyName();
    this._urls = [];
    if ( this.prefix.length > 0 ) {
      this._urls.unshift( this.prefix );
    }
    this._routerSubscription = this.router.events.subscribe( ( navigationEnd: NavigationEnd ) => {
      if ( navigationEnd instanceof NavigationEnd ) {
        this._urls.length = 0; // Fastest way to clear out array
        this.generateBreadcrumbTrail( navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url );
      }
    } );
    if ( this.router.url != '/' ) {
      this._urls.length = 0; // Fastest way to clear out array
      this.generateBreadcrumbTrail( this.router.url );
    }
  }

  ngOnChanges( changes: any ): void {
    if ( !this._urls ) {
      return;
    }
    this._urls.length = 0;
    this.generateBreadcrumbTrail( this.router.url );
  }

  generateBreadcrumbTrail( url: string ): void {
    if ( !this.breadcrumbService.isRouteHidden( url ) ) {
      // Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
      // if (this.prefix !== url && url.lastIndexOf('/') !== 0)
      this._urls.unshift( url );
    }

    if ( url.lastIndexOf( '/' ) > 0 ) {
      this.generateBreadcrumbTrail( url.substr( 0, url.lastIndexOf( '/' ) ) ); // Find last '/' and add everything before it as a parent
                                                                               // route
    } else if ( this.prefix.length > 0 ) {
      this._urls.unshift( this.prefix );
    }
  }

  navigateTo( url: string ): void {
    this.router.navigateByUrl( url );
  }

  friendlyName( url: string ): string {
    return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute( url );
  }

  ngOnDestroy(): void {
    this._routerSubscription.unsubscribe();
  }

  setAllFriendlyName() {

    this.breadcrumbService.hideRoute( '/dashboard' );
    this.breadcrumbService.hideRoute( '/adm' );
    this.breadcrumbService.hideRoute( '/cot' );
    this.breadcrumbService.addFriendlyNameForRoute( '/adm/usuarios', 'Usuarios' );
    this.breadcrumbService.addFriendlyNameForRoute( '/adm/sedes', 'Sedes' );
    this.breadcrumbService.addFriendlyNameForRoute( '/cot/cotizador', 'Cotizaciones' );
    // this.breadcrumbService.addFriendlyNameForRoute( '/citas/tickets/edit', 'Nueva' );
    // this.breadcrumbService.addFriendlyNameForRoute( '/citas/tickets/edit', 'Detalle' );
    // this.breadcrumbService.hideRouteRegex( '^/citas/tickets/edit/[0-9]*' );
    // this.breadcrumbService.addFriendlyNameForRoute( '/asi/constantes/actualizar', 'Actualizar' );
    // this.breadcrumbService.hideRouteRegex( '^/asi/constantes/actualizar/[0-9]*' );
  }

}
