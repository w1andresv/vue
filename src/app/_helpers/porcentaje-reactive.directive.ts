import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { AppSettingService } from '../_services/app-setting.service';

@Directive( {
  selector: '[porcentaje-reactive]',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: PorcentajeReactiveDirective,
    multi: true
  } ]
} )
export class PorcentajeReactiveDirective implements OnInit {

  @Input() most: number;
  @Input() decimales: number;
  @Input() maximo: number;
  @Input() negativo: boolean;

  private onChange: Function = ( valor: string ) => {
  }

  private onTouch: Function = () => {
  }


  constructor( private el: ElementRef, private renderer: Renderer2,
               public appSettingService: AppSettingService ) {
  }

  ngOnInit(): void {
    if ( !this.most ) {
      this.most = 0;
    }

    if ( !this.maximo ) {
      this.maximo = 100;
    }
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
    const val = this.obtenerValor( this.appSettingService.desenmascarar(this.el.nativeElement.value) );
    this.renderer.setProperty( this.el.nativeElement, 'value', this.appSettingService.enmascarar( val ) );
    this.onChange( val );
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    let val = this.obtenerValor( this.appSettingService.desenmascarar(this.el.nativeElement.value) );
    if ( Number( val ) < this.most ) {
      val = '';
    }
    this.renderer.setProperty( this.el.nativeElement, 'value', this.appSettingService.enmascarar( val ) );
    this.onChange( val );
  }

  obtenerValor( valTransformar: any ) {
    let val = this.convertFloat( valTransformar );
    if ( Number( val ) > this.maximo ) {
      val = this.maximo.toString();
    }

    if ( this.decimales && this.decimales > 0 && val.length > 0 ) {
      const a = val.toString().split( '.' );
      if ( a.length > 1 && a[ 1 ].length > this.decimales ) {
        a[ 1 ] = a[ 1 ].substring( 0, this.decimales );
        val = a[ 0 ] + '.' + a[ 1 ];
      }
    }
    return val;
  }

  convertFloat( value ) {
    let esNegativo = false;
    let texto = value.toString();
    if ( this.negativo ) {
      const pc = texto.substring( 0, 1 );
      if ( pc === '-' ) {
        esNegativo = true;
        texto = texto.substring( 1 );
      }
    }
    let newVal = texto.replace( /[^0-9.]/gi, '' ).replace( '..', '.' );
    if ( newVal !== '' && newVal !== '..' ) {

      if ( newVal.split( '.' ).length > 2 ) {
        value = parseFloat( newVal );
      } else if ( newVal === '.' ) {
        value = newVal;
      } else if ( value.search( /\d*\.\D*/ ) !== -1 || value.search( /\d*\D*/ ) !== -1 ) {
        value = texto.replace( /[^0-9.]/gi, '' ).replace( '..', '.' );
      } else {
        value = texto;
      }

      const temp = value.toString();
      const maxlen = this.el.nativeElement.getAttribute( 'maxlength' );
      if ( maxlen && temp.length > maxlen ) {
        value = parseFloat( temp.slice( 0, this.el.nativeElement.getAttribute( 'maxlength' ) ) );
      }
      const max = this.el.nativeElement.getAttribute( 'max' );
      if ( Number( max ) > 0 ) {
        if ( Number( value ) > Number( max ) ) {
          value = parseFloat( max );
        }
      }
      return esNegativo ? ('-' + value) : value;
    } else {
      return esNegativo ? '-' : '';
    }
  }
}
