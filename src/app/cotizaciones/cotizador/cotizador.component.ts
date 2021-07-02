import { Component, OnInit, ViewChild } from '@angular/core';
import { CotizacionService } from '../../_services/cotizacion.service';
import { forkJoin } from 'rxjs';
import { GenerarPdfService } from '../../_services/generarPdf.service';
import { TipoVehiculoService } from '../../_services/tipoVehiculo.service';
import * as moment from 'moment/moment';
import { Table } from 'primeng/table';
import { SedeService } from '../../_services/sede.service';
import { AsesorService } from '../../_services/asesor.service';
import { Cotizacion } from '../../_modelos/cotizacion';
import { UsuarioService } from '../../_services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';

// @ts-ignore
@Component( {
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: [ './cotizador.component.css' ]
} )
export class CotizadorComponent implements OnInit {

  cols: any[];
  cotizaciones: Cotizacion[];
  cotizacionesTemp: Cotizacion[];
  mostrar = 'TABLA';
  pdfCotizacion: any;
  generandoPdf = '';
  generandoPdfComparativo = '';
  es: any;
  fechas: Date[];
  rango: string;
  busqueda: string;
  fechaFinVegencia: any;
  cotizacion: Cotizacion;
  cotizacionEdit: Cotizacion;
  modalMapfre: boolean = false;
  formulario: FormGroup;
  submitted = false;
  items: MenuItem[];
  @ViewChild( 'dt' ) private table: Table;

  constructor( private formBuilder: FormBuilder,
               private cotizacionService: CotizacionService,
               private sedeService: SedeService,
               private asesorService: AsesorService,
               private usuarioService: UsuarioService,
               private tipoVehiculoService: TipoVehiculoService,
               private generarPdfService: GenerarPdfService ) {
  }

  get f() {
    return this.formulario.controls;
  }

  opcionesBotonAcciones() {
    this.items = [
      {
        label: 'Update', icon: 'pi pi-refresh', command: () => {
          console.log();
        }
      },
      {
        label: 'Delete', icon: 'pi pi-times', command: () => {
          console.log();
        }
      },
      { label: 'Angular.io', icon: 'pi pi-info', url: 'http://angular.io' },
      { label: 'Setup', icon: 'pi pi-cog', routerLink: [ '/setup' ] }
    ];
  }

  ngOnInit() {
    this.opcionesBotonAcciones();
    this.cargarTabla();
    const actual = moment( new Date() ).year();
    const actualMas10 = actual + 10;
    const actualMenos10 = actual - 10;
    this.rango = actualMenos10.toString() + ':' + actualMas10.toString();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      // tslint:disable-next-line:max-line-length
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
    };

    this.cols = [
      { field: 'numeroDocumento', header: 'Numero documento' },
      { field: 'tomador', header: 'Tomador' },
      { field: 'valorAsegurado', header: 'Valor asegurado' },
      { field: 'celular', header: 'Celular' },
      { field: 'fechaInicioVigencia', header: 'Fecha inicio vigencia' },
      { field: 'fechaCotizacion', header: 'Fecha cotización' },
      { field: 'placa', header: 'Placa' },
      { field: 'def', header: 'Acción' },
    ];

  }

  cargarTabla() {

    this.cotizacionService.getAll().subscribe( res => {
      this.cotizaciones = res.sort( ( a, b ) => {
        return new Date( b.fechaCotizacion ).getTime() - new Date( a.fechaCotizacion ).getTime();
      } );
      this.cotizacionesTemp = Object.assign( [], this.cotizaciones );
    } );
  }

  crear() {
    this.mostrar = 'EDITAR';
  }

  verModalMapfre( cotizacion ) {
    this.cotizacionEdit = cotizacion;
    this.cargarFormulario( cotizacion );
    this.modalMapfre = true;
  }

  generarPdfMapfre( cotizacion ) {
    this.generandoPdfComparativo = cotizacion._id;
    forkJoin(
      this.tipoVehiculoService.getById( cotizacion.tipoVehiculo ),
      this.asesorService.getById( cotizacion.asesor ),
      this.sedeService.getById( cotizacion.sede )
    ).subscribe( ( [ tipoVehiculo, asesor, sede ] ) => {
      cotizacion.tipoVehiculoName = tipoVehiculo.nombre;
      cotizacion.asesorName = asesor.nombre;
      cotizacion.sedeName = sede.nombre;
      forkJoin(
        this.generarPdfService.obtenerImagen( 'gip', 'png' ),
        this.generarPdfService.obtenerImagen( 'equidad', 'png' ),
        this.generarPdfService.obtenerImagen( 'cooprofesores', 'png' )
      ).subscribe( ( [ gip, equidad, cooprofesores ] ) => {
        this.generarPdfService.generarPdfComparativo( cotizacion, cooprofesores, equidad, gip ).subscribe( res => {
          this.generandoPdfComparativo = '';
          if ( res ) {
            this.pdfCotizacion = res;
            this.mostrar = 'PDF';
          } else {
            this.mostrar = 'TABLA';
          }
        } );
      }, error => {
        this.generandoPdfComparativo = '';
        console.log( 'A ocurrido un error' );
      } );
    }, error => {
      this.generandoPdfComparativo = '';
      console.log( 'A ocurrido un error' );
    } );
  }

  onSubmit() {
    this.submitted = true;
    this.cotizacionEdit = this.formulario.value;
    if ( this.formulario.invalid ) {
      return;
    }
    this.cotizacionService.actualizar( this.cotizacionEdit ).subscribe( rest => {
      this.cotizaciones[ this.cotizaciones.findIndex( x => x._id === rest._id ) ] = rest;
      this.submitted = false;
      this.modalMapfre = false;
      this.cotizacionEdit = null;
      console.log( rest );
    }, error => {
      console.log( error );
    } );
  }

  generarPdf( cotizacion ) {
    this.generandoPdf = cotizacion._id;
    forkJoin(
      this.tipoVehiculoService.getById( cotizacion.tipoVehiculo ),
      this.asesorService.getById( cotizacion.asesor ),
      this.sedeService.getById( cotizacion.sede )
    ).subscribe( ( [ tipoVehiculo, asesor, sede ] ) => {
      cotizacion.tipoVehiculoName = tipoVehiculo.nombre;
      cotizacion.asesorName = asesor.nombre;
      cotizacion.sedeName = sede.nombre;
      forkJoin(
        this.generarPdfService.obtenerImagen( 'gip', 'png' ),
        this.generarPdfService.obtenerImagen( 'equidad', 'png' ),
        this.generarPdfService.obtenerImagen( 'cooprofesores', 'png' )
      ).subscribe( ( [ gip, equidad, cooprofesores ] ) => {
        this.generarPdfService.generarPdf( cotizacion, cooprofesores, equidad, gip ).subscribe( res => {
          this.generandoPdf = '';
          if ( res ) {
            this.pdfCotizacion = res;
            this.mostrar = 'PDF';
          } else {
            this.mostrar = 'TABLA';
          }
        } );
      }, error => {
        this.generandoPdf = '';
        console.log( 'A ocurrido un error' );
      } );
    }, error => {
      this.generandoPdf = '';
      console.log( 'A ocurrido un error' );
    } );
  }

  descargarPdf() {
    console.log( 'descargando pdf..' );
  }

  mostrarComponente( event ) {
    this.mostrar = event;
    if ( event === 'TABLA' ) {
      this.cotizacion = null;
      this.cargarTabla();
    }
  }

  exportExcel() {
    import('xlsx').then( xlsx => {
      forkJoin(
        this.tipoVehiculoService.getAll(),
        this.asesorService.getAll(),
        this.sedeService.getAll(),
        this.usuarioService.listado()
      ).subscribe( ( [ tiposVehiculos, asesores, sedes, usuarios ] ) => {
        let cotizaciones = Object.assign( [], this.table.filteredValue );
        if ( !cotizaciones || cotizaciones.length <= 0 ) {
          cotizaciones = Object.assign( [], this.cotizaciones );
        }
        const listaExport = [];
        cotizaciones.map( x => {
          const tipo = tiposVehiculos.find( v => v.id === x.tipoVehiculo );
          const asesor = asesores.find( v => v._id === x.asesor );
          const usuario = usuarios.find( v => v._id === x.usuario );
          const sede = sedes.find( v => v._id === x.idSede );
          const obj = {
            numeroDocumento: x.numeroDocumento.toString(),
            tomador: x.tomador,
            celular: x.celular,
            correo: x.correo,
            tipoVehiculo: tipo ? tipo.nombre : null,
            placa: x.placa,
            modelo: x.modelo,
            valorAsegurado: x.valorAsegurado,
            fechaInicioVigencia: x.fechaInicioVigencia ? moment( x.fechaInicioVigencia ).format( 'YYYY-MM-DD' ) : '',
            fechaFinVigencia: x.fechaFinVigencia ? moment( x.fechaFinVigencia ).format( 'YYYY-MM-DD' ) : '',
            diasVigencia: x.diasVigencia,
            tasaAplicada: x.tasaAplicada,
            iva: x.iva,
            primaAnual: x.primaAnual,
            asistencias: x.asistencias,
            subTotal: x.subTotal,
            totalVigencia: x.totalVigencia,
            total: x.total,
            fechaCotizacion: x.fechaCotizacion ? moment( x.fechaCotizacion ).format( 'YYYY-MM-DD' ) : '',
            fechaVencimientoPTR: x.fechaVencimientoPTR ? moment( x.fechaVencimientoPTR ).format( 'YYYY-MM-DD' ) : '',
            fechaVencimientoSoat: x.fechaVencimientoSoat ? moment( x.fechaVencimientoSoat ).format( 'YYYY-MM-DD' ) : '',
            numeroDocumentoAsesor: asesor ? asesor.numeroDocumento : null,
            asesor: asesor ? asesor.nombre : null,
            sede: sede ? sede.nombre : null,
            usuario: usuario ? usuario.nombre : null
          };
          listaExport.push( Object.assign( {}, obj ) );
        } );
        const worksheet = xlsx.utils.json_to_sheet( listaExport );
        const workbook = { Sheets: { data: worksheet }, SheetNames: [ 'data' ] };
        const excelBuffer: any = xlsx.write( workbook, { bookType: 'xlsx', type: 'array' } );
        this.saveAsExcelFile( excelBuffer, 'cotizaciones' );
      } );
    } );
  }

  saveAsExcelFile( buffer: any, fileName: string ): void {
    import('file-saver').then( FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob( [ buffer ], {
        type: EXCEL_TYPE
      } );
      FileSaver.saveAs( data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION );
    } );
  }

  filtroFechas() {
    const lista = [];
    if ( this.fechas[ 0 ] !== null && this.fechas[ 1 ] !== null ) {
      const inicio = moment( this.fechas[ 0 ] ).hours( -1 );
      const fin = moment( this.fechas[ 1 ] ).add( 1, 'days' );
      this.cotizacionesTemp.map( x => {
        if ( moment( new Date( x.fechaCotizacion ) ).isBetween( inicio, fin ) ) {
          lista.push( x );
        }
      } );
      this.cotizaciones = lista;
    }
  }

  limpiarFiltroFechas() {
    this.cotizaciones = this.cotizacionesTemp;
  }

  calcularFechaFinVigencia() {
    const fechaFinVigencia = moment( '2018-03-06 00:00:00' );
    const anioActual = moment().get( 'year' );
    const mesActual = moment().get( 'month' );
    const diaActual = moment().get( 'date' );
    const mesInicial = fechaFinVigencia.get( 'month' );
    const diaInicial = fechaFinVigencia.get( 'date' );
    const anioSiguiente = anioActual + 1;
    if ( ( mesActual >= mesInicial ) && ( diaActual >= diaInicial ) ) {
      fechaFinVigencia.set( 'year', anioSiguiente );
    } else {
      fechaFinVigencia.set( 'year', anioActual );
    }
    this.fechaFinVegencia = new Date( fechaFinVigencia.format() );
  }

  editar( event ) {
    this.cotizacion = event;
    this.mostrar = 'EDITAR';
  }

  cargarFormulario( cotizacion? ) {
    const fechaInicio = moment().set( {
      hour: 0,
      minute: 0,
      second: 0
    } ).format();
    const fechaCustom = moment( '2020-01-01' ).set( {
      hour: 0,
      minute: 0,
      second: 0
    } ).format();
    this.formulario = this.formBuilder.group( {
      _id: [ cotizacion ? cotizacion._id : null ],
      fechaCotizacion: [ cotizacion ? cotizacion.fechaCotizacion : null ],
      fechaNacimiento: [ cotizacion ? new Date( cotizacion.fechaNacimiento ) : null ],
      aseguradoraActualTodoRiesgo: [ cotizacion ? cotizacion.aseguradoraActualTodoRiesgo : '' ],
      fechaVencimientoSoat: [ cotizacion ? new Date( cotizacion.fechaVencimientoSoat ) : new Date( fechaCustom ) ],
      fechaVencimientoPTR: [ cotizacion ? new Date( cotizacion.fechaVencimientoPTR ) : new Date( fechaCustom ) ],
      fechaInicioVigencia: [ cotizacion ? cotizacion.fechaInicioVigencia : null, [ Validators.required ] ],
      fechaFinVigencia: [ cotizacion ? cotizacion.fechaFinVigencia : null, [ Validators.required ] ],
      tomador: [ cotizacion ? cotizacion.tomador : null, [ Validators.required ] ],
      numeroDocumento: [ cotizacion ? cotizacion.numeroDocumento : null, [ Validators.required ] ],
      celular: [ cotizacion ? cotizacion.celular : null, [ Validators.required ] ],
      correo: [ cotizacion ? cotizacion.correo : null, [ Validators.required ] ],
      asesor: [ cotizacion ? cotizacion.asesor : null, [ Validators.required ] ],
      sede: [ cotizacion ? cotizacion.sede : null, [ Validators.required ] ],
      placa: [ cotizacion ? cotizacion.placa : null, [ Validators.required ] ],
      diasVigencia: [ cotizacion ? cotizacion.diasVigencia : null, [ Validators.required ] ],
      modelo: [ cotizacion ? cotizacion.modelo : null, [ Validators.required ] ],
      tipoVehiculo: [ cotizacion ? cotizacion.tipoVehiculo : null, [ Validators.required ] ],
      idUsuario: [ cotizacion ? cotizacion.idUsuario : null ],
      primaAnual: [ cotizacion ? cotizacion.primaAnual : null ],
      asistencias: [ cotizacion ? cotizacion.asistencias : null ],
      subTotal: [ cotizacion ? cotizacion.subTotal : null ],
      iva: [ cotizacion ? cotizacion.iva : null ],
      total: [ cotizacion ? cotizacion.total : null ],
      totalVigencia: [ cotizacion ? cotizacion.totalVigencia : null ],
      tasaAplicada: [ cotizacion ? cotizacion.tasaAplicada : null ],
      valorAsegurado: [ cotizacion ? cotizacion.valorAsegurado : null, [ Validators.required ] ],
      valorMapfre: [ cotizacion ? cotizacion.valorMapfre : null, [ Validators.required ] ]
    } );
  }
}
