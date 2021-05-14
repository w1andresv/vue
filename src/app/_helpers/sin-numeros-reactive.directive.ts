import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[sin-numeros-reactive]'
} )
export class SinNumerosReactiveDirective {
  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    let valTransformar = this.el.nativeElement.value;
    if ( valTransformar && valTransformar.length > 0 ) {
      valTransformar = this.limpiar( valTransformar );
      this.control.control.setValue( valTransformar );
    }

  }

  limpiar( valor: any ) {
    let val = '';
    const regex = '[^a-zA-ZÑñÁáÉéóÓúÚíÍ ]';
    const regx = new RegExp( regex, 'g' );
    val = valor.replace( regx, '' );
    return val;
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    let outPut = this.el.nativeElement.value;
    if ( outPut && outPut.length > 0 ) {
      outPut = outPut.trim();
    }
    this.control.control.setValue( outPut );
  }


}
