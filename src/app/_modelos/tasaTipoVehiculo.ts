import { Asesor } from './asesor';

export interface TasaTipoVehiculo {
  _id: string;
  tipoVehiculo: string;
  modeloDesde: string;
  modeloHasta: string;
  tasa: string;
  habilitado: boolean;
  asesores: Asesor[];

}
