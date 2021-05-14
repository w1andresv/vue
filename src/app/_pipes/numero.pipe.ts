import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from '../../proyect.conf';

@Pipe( {
  name: 'numero'
} )
export class NumeroPipe implements PipeTransform {

  appSetings = AppSettings;

  transform( valor: any, decimales?: number, separador?: boolean ): string {

    if ( valor && valor.toString() !== '' && valor.toString() !== undefined ) {
      const sprdr = separador ? separador : true;
      const numero = valor.toString();
      const n = Number( numero );
      const numerosDecimales = n.toFixed( decimales !== null ? decimales : this.appSetings.redondeoDecimal ).toString().split( '.' )[ 1 ];

      // Variable que contendra el resultado final
      let resultado = '';
      let nuevoValor = '';
      // Si el numero empieza por el valor "-" (numero negativo)
      if ( numero[ 0 ] === '-' ) {
        // Cogemos el numero eliminando los posibles puntos que tenga, y sin el signo negativo
        nuevoValor = numero.replace( /\./g, '' ).substring( 1 );
      } else {
        // Cogemos el numero eliminando los posibles puntos que tenga
        nuevoValor = numero.replace( /\./g, '' );
      }
      // Si tiene decimales, se los quitamos al numero
      if ( numero.indexOf( '.' ) >= 0 ) {
        nuevoValor = numero.substring( 0, numero.indexOf( '.' ) );
      }
      if ( sprdr ) {
        // Ponemos un punto cada 3 caracteres
        for ( let j = 0, i = nuevoValor.length - 1; i >= 0; i--, j++ ) {
          resultado = nuevoValor.charAt( i ) + ( ( j > 0 ) && ( j % 3 === 0 ) ? this.appSetings.separadorMiles : '' ) + resultado;
        }
      }

      // Si tiene decimales, se lo añadimos al numero una vez forateado con
      // los separadores de miles
      if ( numero.indexOf( '.' ) >= 0 ) {
        if ( numerosDecimales !== undefined && numerosDecimales !== null
          && numerosDecimales !== 'undefined' && numerosDecimales !== 'null' ) {
          resultado += ( this.appSetings.separadorDecimales + numerosDecimales );
        } else {
          const dcmls = this.decimales( decimales ? decimales : this.appSetings.redondeoDecimal );
          if ( dcmls !== '' ) {
            resultado += ( this.appSetings.separadorDecimales + dcmls );
          }
        }
      } else {
        const dcmls = this.decimales( decimales !== null ? decimales : this.appSetings.redondeoDecimal );
        if ( dcmls !== '' ) {
          resultado += ( this.appSetings.separadorDecimales + dcmls );
        }
      }

      if ( numero[ 0 ] === '-' ) {
        // Devolvemos el valor añadiendo al inicio el signo negativo
        return '- ' + resultado;
      } else {
        return resultado;
      }
    }
  }

  decimales( cantidadDecimales ) {
    let salida = '';
    for ( let i = 0; i < cantidadDecimales; i++ ) {
      salida += '0';
    }
    return salida;
  }
}
