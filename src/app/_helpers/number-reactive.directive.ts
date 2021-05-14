import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[numberDirective]'
} )
export class NumberReactiveDirective {

  @Input() minimo: number;
  @Input() maximo: number;

  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    const valTransformar = this.el.nativeElement.value;
    let outPut = valTransformar.replace( /[^0-9]/gi, '' );
    const temp = outPut.toString();

    const maxLength = 19;
    if ( temp.length >= maxLength ) {
      outPut = temp.slice( 0, maxLength );
    }

    const max = '9223372036854775807';
    if ( Number( outPut ) > Number( max ) ) {
      outPut = max;
    }
    if ( this.maximo && Number( outPut ) > this.maximo ) {
      outPut = this.maximo.toString();
    }
    this.control.control.setValue( outPut );
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    let outPut = this.el.nativeElement.value;
    if ( this.minimo && Number( outPut ) < this.minimo ) {
      outPut = this.minimo;
    }
    if ( this.maximo && Number( outPut ) > this.maximo ) {
      outPut = this.maximo.toString();
    }
    this.control.control.setValue( (outPut && !isNaN( outPut )) ? Number( outPut ) : outPut );
  }

}
