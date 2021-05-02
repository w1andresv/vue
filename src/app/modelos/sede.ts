import { Asesor } from './asesor';

export interface Sede {
  id: string;
  nombre: string;
  codigoSede: string;
  habilitado: boolean;
  asesores: Asesor[];

}
