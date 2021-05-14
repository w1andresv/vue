import { environment } from './environments/environment';

/**
 * PROVIDES STATIC CONSTANTS WITH THE GENERAL APP SETTINGS
 */
export class AppSettings {
  public static isProduction = environment.production;
  public static serviceUrl = environment.endpoint;
  public static separadorMiles = ',';
  public static separadorDecimales = '.';
  public static simboloDinero = '$';
  public static redondeoDecimal = 2;
  public static indicativoLlamar = '03';
}
