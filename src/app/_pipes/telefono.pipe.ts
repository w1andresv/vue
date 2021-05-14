import { Pipe, PipeTransform } from '@angular/core';
import { Utilidades } from '../_utils/utilidades';

@Pipe( {
  name: 'telefono'
} )
export class TelefonoPipe implements PipeTransform {

  utilidades: Utilidades = new Utilidades();

  transform( telefono: string ): string {
    return (telefono && telefono.length === 10) ? this.utilidades.cambiarTelefono( telefono ) : (telefono ? this.utilidades.cambiarTelefonoFijo(telefono) : '');
  }
}
