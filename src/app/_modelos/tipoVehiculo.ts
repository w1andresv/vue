import { TasaTipoVehiculo } from './tasaTipoVehiculo';

export interface TipoVehiculo {
  _id: string;
  nombre: string;
  codigo: string;
  habilitado: boolean;
  tasa: TasaTipoVehiculo[];

}
