import { DateTypeValidator, TipoTelefono } from '../_enums/enum';
import * as moment from 'moment';
import * as jQuery from "jquery";

export class Utilidades {

  cambiarTelefono( telefono: string ): string {
    let valor = null;
    if ( telefono ) {
      telefono.replace( /[^\d]/g, '' );
      valor = telefono.replace( /^([0-9]{3})([0-9]{3})([0-9]{4})$/, '($1) $2-$3' );
    }
    return valor;
  }

  cambiarTelefonoFijo( telefono: string ): string {
    let valor = null;
    if ( telefono ) {
      telefono.replace( /[^\d]/g, '' );
      valor = telefono.replace( /^([0-9]{1})([0-9]{3})([0-9]{4})$/, '($1) $2-$3' );
    }
    return valor;
  }

  quitarMascaraTelefono( telefono: string ): string {
    let valor = telefono ? telefono.replace( /[^\d]/g, '' ) : '';
    valor = valor.replace( /[^0-9]/gi, '' );
    return valor;
  }

  async modificarScroll() {
    await sleep( 10 );
    const heigth = jQuery( '.ui-dynamicdialog' ).prop( 'scrollHeight' );
    jQuery( '.ui-dynamicdialog' ).scrollTop(heigth);
  }

  obtenerFecha360( date: Date, frequency: number ): Date {
    let days = date.getDate();
    let months = date.getMonth() + 1;
    let year = date.getFullYear();
    /** Recorre los días que tenga de frecuencia */
    for ( var d = 0; d < frequency; d++ ) {
      /** aumenta los días */
      days = days + 1;
      /** cuando llegue al máximo de dias se aumenta el mes y se reinician los días */
      if ( days == 31 ) {
        days = 1;
        months = months + 1;
      }
      /** cuando llegue al máximo de meses se aumenta un año y se reinician los meses */
      if ( months == 13 ) {
        months = 1;
        year = year + 1;
      }
    }
    /** se genera una nueva fecha con los datos obtenidos y se retorna */
    return new Date( year, months - 1, days, 0, 0, 0, 0 );

  }

  customDateValidator( fechaValidacion: Date, fechaReferencia: Date, validationType: DateTypeValidator ): boolean {
    switch ( validationType ) {
      case DateTypeValidator.MAYOR: {
        if ( fechaReferencia === null ) {
          return true;
        } else {
          const fechaA = moment( fechaValidacion );
          const fechaB = moment( fechaReferencia );
          return moment( fechaA ).isAfter( fechaB );
        }
      }
      case DateTypeValidator.MENOR: {
        if ( fechaReferencia === null ) {
          return false;
        } else {
          const fechaA = moment( fechaValidacion );
          const fechaB = moment( fechaReferencia );
          return moment( fechaA ).isBefore( fechaB );
        }
      }
      case DateTypeValidator.IGUAL: {
        if ( fechaReferencia === null ) {
          return false;
        } else {
          const fechaA = moment( fechaValidacion );
          const fechaB = moment( fechaReferencia );
          return moment( fechaA ).isSame( fechaB );
        }
      }
      case DateTypeValidator.MAYOR_O_IGUAL: {
        if ( fechaReferencia === null ) {
          return true;
        } else {
          const fechaA = moment( fechaValidacion );
          const fechaB = moment( fechaReferencia );
          return moment( fechaA ).isSameOrAfter( fechaB );
        }
      }
      case DateTypeValidator.MENOR_O_IGUAL: {
        if ( fechaReferencia === null ) {
          return false;
        } else {
          const fechaA = moment( fechaValidacion );
          const fechaB = moment( fechaReferencia );
          return moment( fechaA ).isSameOrBefore( fechaB );
        }
      }

      default:
        return false;
    }
  }
}

/** Se crea función para no instanciar clase */
export function cambiarTelefono( telefono: string ): string {
  let valor = null;
  if ( telefono ) {
    telefono.replace( /[^\d]/g, '' );
    valor = telefono.replace( /^([0-9]{3})([0-9]{3})([0-9]{4})$/, '($1) $2-$3' );
  }
  return valor;
}

/** Se crea función para no instanciar clase */
export function quitarMascaraTelefono( telefono: string ): string {
  let valor = telefono ? telefono.replace( /[^\d]/g, '' ) : '';
  valor = valor.replace( /[^0-9]/gi, '' );
  return valor;
}

export class AtributosComunes {
  public static whatsApp = 'https://wa.me';
  public static indicador = '57';
  public static rutaNumeros = `${ AtributosComunes.whatsApp }/${ AtributosComunes.indicador }`;
}

export function obtenerTelefonoChatWp( telefono: string ) {
  return `${ AtributosComunes.indicador }${ telefono }@c.us`;
}


export function sleep( ms: number ) {
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

export function obtenerTiempoFormato( duracion: number ) {
  const horas = Math.floor( duracion / 3600 );
  let restante = duracion - ( horas * 3600 );
  const minutos = Math.floor( restante / 60 );
  restante = restante - ( minutos * 60 );
  return `${ horas.toString().padStart( 2, '0' ) }:${ minutos.toString().padStart( 2, '0' ) }:${ restante.toString().padStart( 2, '0' ) }`;
}


