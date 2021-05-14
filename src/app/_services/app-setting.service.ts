import { Injectable } from '@angular/core';
import { AppSettings } from '../../proyect.conf';

@Injectable( { providedIn: 'root' } )
export class AppSettingService {
  constructor() {
  }

  get separadorDecimales(): string {
    return AppSettings.separadorDecimales;
  }

  get separadorMiles(): string {
    return AppSettings.separadorMiles;
  }

  get simboloDinero(): string {
    return AppSettings.simboloDinero;
  }

  get redondeoDecimal(): number {
    return AppSettings.redondeoDecimal;
  }

  enmascarar( valor ) {
    if ( valor && AppSettings.separadorDecimales ) {
      valor = valor.toString().replace( /[.]/gi, AppSettings.separadorDecimales );
    }
    return valor;
  }

  desenmascarar( valor ) {
    if ( valor && AppSettings.separadorDecimales !== '.' ) {
      valor = valor.toString().replace( /[.]/gi, AppSettings.separadorDecimales !== ',' ? ',' : '-' );
      const regex = `[${ AppSettings.separadorDecimales }]`;
      const regx = new RegExp( regex, 'g' );
      valor = valor.toString().replace( regx, '.' );
    }
    return valor;
  }

}
