import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[alphanumDirective]'
} )
export class AlphabeticReactiveDirective {


  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'keyup', [ '$event' ] ) onEvent( $event ) {
    const valTransformar = this.el.nativeElement.value;
    let outPut = valTransformar.replace( /[^A-Za-z0-9ñáéíóúÁÉÍÓÚ ]/gi, '' );
    this.control.control.setValue( outPut );
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    const valTransformar = this.el.nativeElement.value;
    let outPut = valTransformar.replace( /[^A-Za-z0-9ñáéíóúÁÉÍÓÚ ]/gi, '' );
    this.control.control.setValue(  outPut );
  }

}
