import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive( {
  selector: '[upper-case]'
} )
export class UpperCaseReactiveDirective {

  @Input() sinCaracteresEspeciales: boolean;

  constructor( private el: ElementRef, private control: NgControl ) {
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    let valTransformar = this.el.nativeElement.value;
    this.control.control.setValue( valTransformar ? (this.sinCaracteresEspeciales ? this.limpiar( valTransformar.toUpperCase() ) : valTransformar.toUpperCase()) : '' );
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    let outPut = this.el.nativeElement.value;
    this.control.control.setValue( outPut ? (this.sinCaracteresEspeciales ? this.limpiar( outPut.trim() ) : outPut.trim()) : '' );
  }

  limpiar( valor: any ) {
    let val = '';
    const regex = '[^a-zA-ZÑñÁáÉéóÓúÚíÍ0-9 ]';
    const regx = new RegExp( regex, 'g' );
    val = valor.replace( regx, '' );
    return val;
  }
}
