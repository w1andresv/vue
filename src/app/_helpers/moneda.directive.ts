import { Directive, ElementRef, HostListener, Injector, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { DineroPipe } from '../_pipes/dinero.pipe';
import { AppSettingService } from '../_services/app-setting.service';

@Directive( {
  selector: '[moneda-reactive]',
  providers: [ {
    provide: NG_VALUE_ACCESSOR,
    useExisting: MonedaDirective,
    multi: true
  }, DineroPipe ]
} )
export class MonedaDirective {

  @Input() minimo: number;
  @Input() maximo: number;
  @Input() decimales: number;

  private onChange: Function = ( valor: string ) => {
  };

  private onTouch: Function = () => {
  };


  constructor( private el: ElementRef, private renderer: Renderer2, private dineroPipe: DineroPipe, private appSettingService: AppSettingService ) {
  }

  writeValue( value: string ): void {
    this.renderer.setProperty( this.el.nativeElement, 'value', (value || Number(value) === 0) ? this.enmascarar( value ) : '' );
  }

  registerOnChange( fn: Function ): void {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ): void {
    this.onTouch = fn;
  }

  @HostListener( 'input', [ '$event' ] ) onEvent( $event ) {
    this.procesar();
  }

  @HostListener( 'blur', [ '$event' ] ) onBlur( $event ) {
    this.procesar( true );
  }

  procesar( valMinimo: boolean = false ) {
    const nueValor = this.obtenerValor( this.el.nativeElement.value, valMinimo );
    this.renderer.setProperty( this.el.nativeElement, 'value', this.enmascarar( nueValor ) );
    this.onChange( nueValor );
  }

  enmascarar( valor ) {
    let dato = '';
    if ( valor || valor === 0 ) {
      dato = this.dineroPipe.transform( valor, this.decimales ? this.decimales : 0 );
    }
    return dato;
  }

  obtenerValor( event, valMinimo: boolean = false ) {
    let nueValor = this.convertToFloat( this.appSettingService.desenmascarar( event ) );
    if ( valMinimo && this.minimo !== null && this.minimo !== undefined && !isNaN( this.minimo ) && this.minimo > nueValor ) {
      nueValor = this.minimo;
    } else if ( valMinimo &&  (this.minimo === undefined || this.minimo === null ) && nueValor <= 0 ) {
      nueValor = '';
    }

    if ( this.maximo !== null && this.maximo !== undefined && !isNaN( this.maximo ) && this.maximo < nueValor ) {
      nueValor = this.maximo;
    }
    return nueValor;
  }

  convertToFloat( event ) {
    const newVal = event ? event.toString().replace( /[^0-9.]/gi, '' ).replace( '..', '.' ) : '';
    if ( newVal !== '' && newVal !== '..' ) {
      if ( newVal.split( '.' ).length > 2 ) {
        event = parseFloat( newVal );
      } else if ( newVal === '.' ) {
        event = newVal;
      } else if ( newVal.search( /\d*\.\D*/ ) !== -1 || newVal.search( /\d*\D*/ ) !== -1 ) {
        event = newVal.replace( /[^0-9.]/gi, '' ).replace( '..', '.' );
      }
    } else {
      event = '';
    }
    return event ? Number( event ) : event;
  }


}
