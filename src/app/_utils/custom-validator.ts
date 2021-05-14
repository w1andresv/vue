import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export class CustomValidator {
  static multipleCheckboxRequireOne( fa: FormArray ) {
    let valid = false;
    for ( let x = 0; x < fa.length; ++x ) {
      if ( fa.at( x ).value ) {
        valid = true;
        break;
      }
    }
    return valid ? null : {
      multipleCheckboxRequireOne: true
    };
  }
}

export class CustomValidatorCuestionarios {
  static multipleCheckboxRequireOne( fa: FormArray ) {
    let valid = false;
    for ( let x = 0; x < fa.length; ++x ) {
      const atributo = fa.at( x ).value;
      if ( atributo.valor ) {
        valid = true;
        break;
      }
    }
    return valid ? null : {
      multipleCheckboxRequireOne: true
    };
  }
}


export function dependenciaObligatorio( llave1: string, llave2: string ): ValidatorFn {
  return ( control: AbstractControl ): ValidationErrors | null => {
    const start = control.value[ llave1 ];
    const end = control.value[ llave2 ];
    return ( ( ( start || start == '0' ) && !end ) || ( !start && ( end || end == '0' ) ) ) ? { depende: true } : null;
  };
}




