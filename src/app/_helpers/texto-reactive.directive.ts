import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[appTexto]'
} )
export class TextoReactiveDirective {

  @Input() sinNumeros: boolean;
  @Input() sinCaracteres: boolean;
  @Input() sinEspacio: boolean;
  @Input() sinPunto: boolean;
  @Input() sinLetras: boolean;
  @Input() upper: boolean;
  @Input() sinComa = true;

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
    let val = valor;
    const regex = [];

    if ( this.sinCaracteres ) {
      if ( !this.sinComa ) {
        regex.push( '[^a-zA-ZÑñÁáÉéóÓúÚíÍ.0-9, ]' );
      } else {
        regex.push( '[^a-zA-ZÑñÁáÉéóÓúÚíÍ.0-9 ]' );
      }
    }

    if ( this.sinPunto ) {
      regex.push( '[.]' );
    }

    if ( this.sinEspacio ) {
      regex.push( '[ ]' );
    }

    if ( this.sinNumeros ) {
      regex.push( '[0-9]' );
    }

    if ( this.sinLetras ) {
      regex.push( '[a-zA-ZÑñÁáÉéóÓúÚíÍ]' );
    }

    if ( this.sinComa ) {
      regex.push( '[,]' );
    }


    if ( regex.length > 0 ) {
      const regx = new RegExp( regex.join( '|' ), 'g' );
      val = valor.replace( regx, '' );
    }

    if ( this.upper && val ) {
      val = val.toUpperCase();
    }

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
