import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[codigos-reactive]'
} )
export class CodigosReactiveDirective {

  @Input() sinNumeros: boolean;
  @Input() conMinusculas: boolean;

  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    let valTransformar = this.el.nativeElement.value;
    let regex = '[^A-Z0-9]';
    if ( this.conMinusculas ) {
      regex = '[^A-Za-z0-9]';
    }
    if ( this.sinNumeros ) {
      if ( this.conMinusculas ) {
        regex = '[^A-Za-z]';
      } else {
        regex = '[^A-Z]';
      }
    }
    const regx = new RegExp( regex, 'g' );
    if ( this.conMinusculas ) {
      valTransformar = valTransformar.replace( regx, '' );
    } else {
      valTransformar = valTransformar.toUpperCase().replace( regx, '' );
    }

    this.control.control.setValue( valTransformar );
  }
}
