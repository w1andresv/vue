import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jsPDF  from 'jspdf';
import 'jspdf-autotable'
import { forkJoin, Observable } from 'rxjs';
import * as moment from 'moment/moment';

@Injectable( {
  providedIn: 'root'
} )
export class GenerarPdfService {
  fechaFinVegencia: any;
  private urlImagen = './assets/images/';

  constructor( private http: HttpClient ) {
  }

  public obtenerImagen( imagen: string, formato: string ) {
    return this.http.get( `${ this.urlImagen }${ imagen }.${ formato }`, { responseType: 'blob' } ).pipe( map( img => img as Blob ) );
  }

  generarPdf( cotizacion, cooprofesores, equidad, gip ): Observable<any> {
    this.calcularFechaFinVigencia();
    return new Observable( observer => {
      forkJoin(
        this.leerImagen( cooprofesores ),
        this.leerImagen( equidad ),
        this.leerImagen( gip ),
      ).subscribe( ( [ cooprofesoresBase64, equidadBase64, gipBase64 ] ) => {
        const doc = new jsPDF( 'p', 'mm', 'a4' );
        doc.addImage( equidadBase64, 'JPEG', 3, 3, 50, 15 );
        doc.addImage( cooprofesoresBase64, 'JPEG', 155, 3, 30, 15 );
        doc.addImage( gipBase64, 'JPEG', 188, 3, 17, 15 );
        doc.autoTable( {
          styles: { fontSize: 8, cellPadding: 0.5, columnWidth: 'wrap' },
          theme: 'grid',
          startY: 18,
          margin: { top: 3, left: 3, right: 3 },
          body: [
            [
              {
                content: 'TODO RIESGO AUTOPLUS', colSpan: 12,
                styles: { halign: 'center', fillColor: '#0ec254', fontStyle: 'bold' }
              }
            ],
            [
              { content: 'Fecha cotización', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              {
                content: cotizacion.fechaCotizacion,
                colSpan: 2,
                styles: { halign: 'center', textColor: '#0ec254', fontStyle: 'bold' }
              },
              { content: 'Inicio vigencia', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              {
                content: cotizacion.fechaInicioVigencia,
                colSpan: 2,
                styles: { halign: 'center', textColor: '#0ec254', fontStyle: 'bold' }
              },
              { content: 'Fin vigencia', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              {
                content: cotizacion.fechaFinVigencia,
                colSpan: 2,
                styles: { halign: 'center', textColor: '#0ec254', fontStyle: 'bold' }
              }
            ],
            [
              { content: 'Tomador', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.tomador, colSpan: 4, styles: { halign: 'right' } },
              {
                content: 'Días de vigencia',
                colSpan: 4,
                rowSpan: 5,
                styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' }
              },
              {
                content: cotizacion.diasVigencia,
                colSpan: 2,
                rowSpan: 5,
                styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' }
              },
            ],
            [
              { content: 'Celular', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.celular, colSpan: 4, styles: { halign: 'right' } }
            ],
            [
              { content: 'C.C', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.numeroDocumento, colSpan: 4, styles: { halign: 'right' } }
            ],
            [
              { content: 'Correo', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.correo, colSpan: 4, styles: { halign: 'right' } }
            ],
            [
              { content: 'Asesor', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.asesorName, colSpan: 4, styles: { halign: 'right' } }
            ],
            [
              { content: 'Sede', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: cotizacion.sedeName, colSpan: 8, styles: { halign: 'right' } },
              { content: '', colSpan: 2, styles: { halign: 'right' } }
            ],
            [
              { content: 'Tipo vehiculo', colSpan: 2, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: 'Placa', colSpan: 4, styles: { halign: 'left', fontStyle: 'bold' } },
              { content: 'Modelo', colSpan: 4, styles: { halign: 'left', fontStyle: 'bold' } },
              {
                content: cotizacion.modelo,
                colSpan: 1,
                styles: { halign: 'right', textColor: '#0ec254', fontStyle: 'bold' }
              },
              { content: '    ', colSpan: 1, styles: { halign: 'right' } }
            ],
            [
              {
                content: cotizacion.tipoVehiculoName,
                colSpan: 2,
                styles: { halign: 'left', textColor: '#0ec254', fontStyle: 'bold' }
              },
              {
                content: cotizacion.placa,
                colSpan: 4,
                styles: { halign: 'left', fontStyle: 'bold', textColor: '#0ec254' }
              },
              { content: 'Valor asegurado', colSpan: 4, styles: { halign: 'left', fontStyle: 'bold' } },
              {
                content: Number( cotizacion.valorAsegurado ).toLocaleString( 'es-CO', {
                  style: 'currency',
                  currency: 'COP'
                } ),
                colSpan: 1,
                styles: { halign: 'right', textColor: '#0ec254', fontStyle: 'bold' }
              },
              {
                content: '   ',
                colSpan: 1,
                styles: { halign: 'right', textColor: '#0ec254', fontStyle: 'bold' }
              }
            ],
            [
              {
                content: '', colSpan: 12,
                styles: {
                  halign: 'center',
                  fillColor: '#b3b3b3',
                  fontStyle: 'bold',
                  cellPadding: 0.2,
                  rowHeight: 5
                }
              }
            ], [
              {
                content: 'Responsabilidad Civil extracontractual',
                colSpan: 6,
                styles: { halign: 'center', fontStyle: 'bold' }
              },
              { content: 'Valor asegurado', colSpan: 4, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'Deducibles', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ], [
              {
                content: 'Daños a Bienes de terceros',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              {
                content: '$ 4.000.000.000',
                colSpan: 4,
                rowSpan: 3,
                styles: { halign: 'center', fontStyle: 'bold', valign: 'middle' }
              },
              {
                content: 'Cero Deducibles',
                colSpan: 2,
                rowSpan: 3,
                styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' }
              },
            ], [
              {
                content: 'Muerte o lesión a una persona',
                colSpan: 6,
                styles: { halign: 'left' }
              }
            ], [
              {
                content: 'Muerte o lesiones a dos o más personas',
                colSpan: 6,
                styles: { halign: 'left' }
              }
            ],
            [
              {
                content: 'COBERTURAS AL VEHICULO', colSpan: 12,
                styles: { halign: 'left', fontStyle: 'bold', cellPadding: 0.2 }
              }
            ],
            [
              {
                content: 'Pérdida Parcial del Vehículo por Daños',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              {
                content: 'Valor asegurado',
                colSpan: 4,
                rowSpan: 5,
                styles: { halign: 'center', fontStyle: 'bold', valign: 'middle' }
              },
              { content: '$950.000', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ],
            [
              {
                content: 'Pérdida total del Vehículo por Daños',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              { content: 'Sin deducible', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ], [
              {
                content: 'Pérdida Parcial del Vehículo por Hurto o Hurto Calificado',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              { content: '$950.000', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ], [
              {
                content: 'Pérdida Total del Vehículo por Hurto o Hurto Calificado',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              { content: 'Sin deducible', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ], [
              {
                content: 'Terremoto, Temblor, Erupción Volcánica',
                colSpan: 6,
                styles: { halign: 'left' }
              },
              {
                content: 'Segun cobertura afectada',
                colSpan: 2,
                styles: { halign: 'center', fontStyle: 'bold' }
              },
            ], [
              {
                content: 'OTRAS COBERTURAS',
                colSpan: 9,
                styles: { halign: 'left', fontStyle: 'bold' }
              },
              { content: 'AMPARA', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'DEDUCIBLE', colSpan: 2, styles: { halign: 'center', fontStyle: 'bold' } },
            ], [
              {
                content: 'Gastos de Transporte Personal por P Totales, aplica para autos servicio particular familiar',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Asistencia Extendida, Llantas estalladas – pequeños accesorios. Rotura de cristales laterales',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Accidentes personales $40,000,000 para el conductor, solo para autos particulares de servicio familiar',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Vehículo de Reemplazo (10 días en P.Parciales - 15 días en P. Totales), Excluyente con gastos de Transporte.' +
                  '\nSolo para autos particulares de servicio familiar  ',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Revisión para viaje. Viaje seguro, solo para autos particulares de servicio familiar',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Kit de viaje, solo para autos particulares de servicio familiar',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Asistencia Jurídica',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Amparo patrimonial',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ], [
              {
                content: 'Asistencia al vehículo ( Conductor Elegido, grua, carro taller, cerrajero)',
                colSpan: 9,
                styles: { halign: 'left' }
              },
              { content: 'Si', colSpan: 1, styles: { halign: 'center', fontStyle: 'bold' } },
              { content: 'No aplica', colSpan: 2, styles: { halign: 'center' } },
            ],
            [
              {
                content: '', colSpan: 12,
                styles: { halign: 'center', fillColor: '#b3b3b3', fontStyle: 'bold' }
              }
            ],
            [
              {
                content: 'PRIMA ANUAL', colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold' }
              }, {
              content: Number( Number( cotizacion.primaAnual ).toFixed() ).toLocaleString( 'es-CO', {
                style: 'currency',
                currency: 'COP'
              } ),
              colSpan: 2,
              styles: { halign: 'right', fontStyle: 'bold' }
            }
            ],
            [
              {
                content: 'ASISTENCIAS', colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold' }
              }, {
              content: Number( cotizacion.asistencias ).toLocaleString( 'es-CO', {
                style: 'currency',
                currency: 'COP'
              } ), colSpan: 2,
              styles: { halign: 'right', fontStyle: 'bold' }
            }
            ],
            [
              {
                content: 'SUB TOTAL', colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold' }
              }, {
              content: Number( Number( cotizacion.subTotal ).toFixed() ).toLocaleString( 'es-CO', {
                style: 'currency',
                currency: 'COP'
              } ), colSpan: 2,
              styles: { halign: 'right', fontStyle: 'bold' }
            }
            ],
            [
              {
                content: 'I.V.A (19%)', colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold' }
              }, {
              content: Number( Number( cotizacion.iva ).toFixed() ).toLocaleString( 'es-CO', {
                style: 'currency',
                currency: 'COP'
              } ), colSpan: 2,
              styles: { halign: 'right', fontStyle: 'bold' }
            }
            ], [
              {
                content: 'Total Solución Autoplus Anual', colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold' }
              }, {
                content: Number( Number( cotizacion.total ).toFixed() ).toLocaleString( 'es-CO', {
                  style: 'currency',
                  currency: 'COP'
                } ), colSpan: 2,
                styles: { halign: 'right', fontStyle: 'bold' }
              }
            ], [
              {
                content: 'Total Solución Autoplus a pagar por vigencia (Hasta el ' + moment( this.fechaFinVegencia ).format( 'YYYY/MM/DD' ) + ')',
                colSpan: 10,
                styles: { halign: 'left', fontStyle: 'bold', textColor: 'red' }
              }, {
                content: Number( Number( cotizacion.totalVigencia ).toFixed() ).toLocaleString( 'es-CO', {
                  style: 'currency',
                  currency: 'COP'
                } ), colSpan: 2,
                styles: { halign: 'right', fontStyle: 'bold', textColor: 'red' }
              }
            ],
            [
              {
                content: 'PRODUCTOS COMPLEMENTARIOS', colSpan: 12,
                styles: { halign: 'center', fillColor: '#0ec254', fontStyle: 'bold' }
              }
            ],
            [
              {
                content: 'Beneficios de la solución de Maestro Seguro', colSpan: 12,
                styles: { halign: 'center', fillColor: '#0ec254', fontStyle: 'bold' }
              }
            ], [
              {
                content: 'Es una solución diseñada para proteger a nuestros asociados, cuyo objetivo principal es entregar un beneficio ' +
                  'económico ante eventos adversos como: 1.Diagnostico por primera vez de una enfermedad grave como un cancer o' +
                  ' accidente cerebrovascular $5 millones, 2. indemnización en caso de una hospitalización ($30,000 diarios),' +
                  ' 3. Perdida de la capacidad laboral $10 millones, 4. Fallecimiento $10 millones.',
                colSpan: 12,
                styles: { halign: 'left', cellPadding: 1, overflow: 'linebreak' }
              }
            ], [
              {
                content: 'Beneficios de la solución Seguro para el Hogar', colSpan: 12,
                styles: { halign: 'center', fillColor: '#0ec254', fontStyle: 'bold' }
              }
            ], [
              {
                content: 'Es una solución diseñada para proteger el patrimonio de nuestros asociados, cuyo objetivo principal es ' +
                  'entregar un beneficio económico por daños causados a su vivienda ante diferentes eventos, como  beneficios ' +
                  'prinicipales cuenta con Asistencia para el Hogar Cerrajero, plomero, electricista,  Vidrios Rotos en ventanas ' +
                  'exteriores, Asistencia Celaduria, Orientacion medica basica telefonica,  Reparacion de tejas, Vigilante eventos ' +
                  'especiales, Traslado de mascota por accidente o enfermedad.',
                colSpan: 12,
                styles: { halign: 'left', cellPadding: 1, overflow: 'linebreak' }
              }
            ], [
              {
                content: '24 HORAS AL DIA 365 AL AÑO DESDE SU CELULAR #324', colSpan: 12,
                styles: { halign: 'center', fillColor: '#0ec254', fontStyle: 'bold' }
              }
            ], [
              {
                content: 'REQUISITOS PARA EMITIR \nSolicitud de automoviles firmada. \nCopia de la cédula del propietario del' +
                  ' vehículo Copia de la tarjeta de propiedad',
                colSpan: 10,
                styles: { halign: 'center', textColor: 'red' }
              }, {
                content: 'Protege tu Hogar desde  $378 diarios y tu vida tambien la puedes proteger desde $228 diarios',
                colSpan: 2,
                styles: { halign: 'center', textColor: 'red' }
              }
            ], [
              {
                content: 'Puedes contactar a nuestros Asesores Maestros\n' +
                  'GIP SEGUROS LTDA\n' +
                  'Mail: gipsolicitudes@gmail.com\n' +
                  'Cel. 3223070796-3154721837\n' +
                  'www.gipseguros.com\n' +
                  'LA EXPEDICION DE LA PRESENTE COTIZACION NO IMPLICA ACEPTACION DEL RIESGO. LOS TERMINOS Y\n' +
                  'CONDICIONES AQUI SEÑALADOS ESTAN SUJETOS A LA INSPECCION Y APROBACION DEL RIESGO\n' +
                  'OBJETO DEL SEGURO',
                colSpan: 12,
                styles: { halign: 'center', cellPadding: 1, overflow: 'linebreak' }
              }
            ]
          ]
        } );
        const salida = URL.createObjectURL( new Blob( [ doc.output( 'blob' ) ], { type: 'application/pdf' } ) );
        observer.next( salida );
        observer.complete();
      }, error => {
        observer.next( null );
        observer.complete();
      } );
    } );
  }

  calcularFechaFinVigencia() {
    const fechaFinVigencia = moment( '2018-04-06 00:00:00' );
    const anioActual = moment().get( 'year' );
    const mesActual = moment().get( 'month' );
    const diaActual = moment().get( 'date' );
    const mesInicial = fechaFinVigencia.get( 'month' );
    const diaInicial = fechaFinVigencia.get( 'date' );
    const anioSiguiente = anioActual + 1;
    if ( mesActual > mesInicial ) {
      fechaFinVigencia.set( 'year', anioSiguiente );
    } else {
      if ( ( mesActual == mesInicial ) && ( diaActual >= diaInicial ) ) {
        fechaFinVigencia.set( 'year', anioSiguiente );
      } else {
        fechaFinVigencia.set( 'year', anioActual );
      }
    }
    this.fechaFinVegencia = new Date( fechaFinVigencia.format() );

  }

  private leerImagen( imagen: Blob ) {
    return new Promise( ( resolve ) => {
      const reader = new FileReader();
      reader.readAsDataURL( imagen );
      reader.onload = () => {
        resolve( reader.result );
      };
    } );
  }
}
