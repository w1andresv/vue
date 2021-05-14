import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[capitalize-reactive]'
} )
export class CapitalizeReactiveDirective {

  @Input() parrafo: boolean;

  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    let valTransformar = this.el.nativeElement.value;
    if ( valTransformar && valTransformar.length > 0 ) {
      if ( this.parrafo && valTransformar.length > 1 ) {
        const penUltimo = valTransformar.substring( valTransformar.length - 2, valTransformar.length - 1 );
        const ultimo = valTransformar.substring( valTransformar.length - 1 );
        if ( ultimo == ' ' && penUltimo == ' ' ) {
          valTransformar = valTransformar.substring( 0, valTransformar.length - 1 );
        }
      }
      valTransformar = valTransformar.substring( 0, 1 ).toUpperCase() + valTransformar.substring( 1 ).toLowerCase();
      this.control.control.setValue( valTransformar );
    }

  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    let valTransformar = this.el.nativeElement.value;
    if ( valTransformar && valTransformar.length > 0 ) {
      this.control.control.setValue( valTransformar.trim() );
    }

  }
}
