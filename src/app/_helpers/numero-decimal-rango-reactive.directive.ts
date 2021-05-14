import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AppSettingService } from '../_services/app-setting.service';

@Directive( {
  selector: '[numero-decimal-rango-reactive]',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: NumeroDecimalRangoReactiveDirective,
    multi: true
  } ]
} )
export class NumeroDecimalRangoReactiveDirective {

  @Input() decimales: number;
  @Input() entero: number;
  @Input() minimo: number;
  @Input() maximo: number;

  private onChange: Function = ( valor: string ) => {
  }

  private onTouch: Function = () => {
  }

  constructor( private el: ElementRef, private renderer: Renderer2,
               public appSettingService: AppSettingService ) {
  }

  writeValue( value: string ): void {
    this.renderer.setProperty( this.el.nativeElement, 'value', this.appSettingService.enmascarar( value ) );
  }

  registerOnChange( fn: Function ): void {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ): void {
    this.onTouch = fn;
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {

    let val = this.convertFloat( this.appSettingService.desenmascarar(this.el.nativeElement.value) );

    if ( this.decimales && this.decimales > 0 && val.length > 0 ) {
      const a = val.toString().split( '.' );
      if ( a.length > 1 && a[ 1 ].length > this.decimales ) {
        a[ 1 ] = a[ 1 ].substring( 0, this.decimales );
        val = a[ 0 ] + '.' + a[ 1 ];
      }
    }

    if ( this.entero && this.entero > 0 && val.length > 0 ) {
      const a = val.toString().split( '.' );
      if ( a.length > 0 && a[ 0 ].length > this.entero ) {
        a[ 0 ] = a[ 0 ].substring( 0, this.entero );
      }
      if ( a.length > 1 ) {
        val = a[ 0 ] + '.' + a[ 1 ];
      } else {
        val = a[ 0 ];
      }
    }

    if ( this.minimo && val < this.minimo ) {
      val = '';
    }

    if ( this.maximo && val > this.maximo ) {
      val = this.maximo.toString();
    }

    this.renderer.setProperty( this.el.nativeElement, 'value', this.appSettingService.enmascarar( val ) );
    this.onChange( val );
  }

  convertFloat( value ) {
    let newVal = value.toString().replace( /[^0-9.]/gi, '' ).replace( '..', '.' );
    if ( newVal !== '' && newVal !== '..' ) {

      if ( newVal.split( '.' ).length > 2 ) {
        value = parseFloat( newVal );
      } else if ( newVal === '.' ) {
        value = newVal;
      } else if ( value.search( /\d*\.\D*/ ) !== - 1 || value.search( /\d*\D*/ ) !== - 1 ) {
        value = value.replace( /[^0-9.]/gi, '' ).replace( '..', '.' );
      }

      let temp = value.toString();
      const maxlen = this.el.nativeElement.getAttribute( 'maxlength' );
      if ( maxlen && temp.length > maxlen ) {
        value = parseFloat( temp.slice( 0, this.el.nativeElement.getAttribute( 'maxlength' ) ) );
      }
      let max = this.maximo + '';
      if ( Number( max ) > 0 ) {
        if ( Number( value ) > Number( max ) ) {
          const valor = parseFloat( max ) - 0.1;
          value = valor;
        }
      }
      let min = this.minimo + '';
      if ( Number( min ) ) {
        if ( Number( value ) <= Number( min ) ) {
          const valor = parseFloat( min ) + 0.1;
          value = valor;
        }
      }
      return value;
    } else {
      return '';
    }
  }

}
