import { Asesor } from './asesor';

export interface Sede {
  _id: string;
  nombre: string;
  codigo: string;
  habilitado: boolean;
  asesores: Asesor[];

}
