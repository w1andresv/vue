import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cotizacion } from '../../_modelos/cotizacion';
import * as moment from 'moment/moment';
import { TipoVehiculoService } from '../../_services/tipoVehiculo.service';
import { TasaTipoVehiculoService } from '../../_services/tasaTipoVehiculo.service';
import { CotizacionService } from '../../_services/cotizacion.service';
import { forkJoin } from 'rxjs';
import { AsesorService } from '../../_services/asesor.service';
import { SedeService } from '../../_services/sede.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { Message } from 'primeng/api';

@Component( {
  selector: 'app-cotizador-editar',
  templateUrl: './cotizador-editar.component.html',
  styleUrls: [ './cotizador-editar.component.css' ]
} )
export class CotizadorEditarComponent implements OnInit {

  formulario: FormGroup;
  submitted = false;
  @Output()
  dismiss: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  cotizacion: Cotizacion;
  fechaCotizacion: any;
  es: any;
  anioActual: any;
  listaModelos: any[] = [];
  listaTiposVehiculos: any[] = [];
  listaAsesores: any[] = [];
  listaSedes: any[] = [];
  diasVigencia: any;
  tasaAplicada: any;
  primaAnual: any;
  subTotal: any;
  iva: any;
  total: any;
  totalVigencia: any;
  asistencias = 48000;
  accidentesPersonales = 34528;
  calculado = false;
  calculando = false;
  msgs: Message[] = [];
  fechaFinVegencia: any;
  usuarioLogueado: any;
  guardando = false;
  cargando = false;


  constructor( private formBuilder: FormBuilder,
               private sedeService: SedeService,
               private asesorService: AsesorService,
               private cotizacionService: CotizacionService,
               private tipoVehiculoService: TipoVehiculoService,
               private authenticationService: AuthenticationService,
               private tasaTipoVehiculoService: TasaTipoVehiculoService ) {
  }

  get f() {
    return this.formulario.controls;
  }

  ngOnInit() {
    this.cargando = true;
    this.msgs.push( { severity: 'success', summary: '', detail: 'Guardado exitoso' } );
    this.usuarioLogueado = this.authenticationService.obtenerUsuario();
    this.calcularFechaFinVigencia();
    forkJoin(
      this.tipoVehiculoService.getAll(),
      this.sedeService.getAllEnabled()
    ).subscribe( ( [ tiposVehiculos, sedes ] ) => {
      tiposVehiculos.map( x => {
        this.listaTiposVehiculos.push( { value: x.id, label: x.nombre } );
      } );
      sedes.map( x => {
        this.listaSedes.push( { value: x.id, label: x.nombre } );
      } );
      if ( this.cotizacion ) {
        this.cargarFormulario( this.cotizacion );
      } else {
        this.cargarFormulario();
      }
      this.cargando = false;
    } );
    this.anioActual = moment( new Date() ).year();
    const anioInicio = this.anioActual - 15;
    const lista = [];
    for ( let i = anioInicio; i < this.anioActual + 2; i++ ) {
      lista.push( { value: i, label: i } );
    }
    this.listaModelos = lista;
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
        'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
    };
    this.fechaCotizacion = moment().format( 'YYYY/MM/DD' );
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
      id: [ cotizacion ? cotizacion.id : null ],
      fechaCotizacion: [ cotizacion ? cotizacion.fechaCotizacion : null ],
      fechaVencimientoSoat: [ cotizacion ? new Date( cotizacion.fechaVencimientoSoat ) : new Date( fechaCustom ) ],
      fechaVencimientoPTR: [ cotizacion ? new Date( cotizacion.fechaVencimientoPTR ) : new Date( fechaCustom ) ],
      fechaInicioVigencia: [ cotizacion ? new Date( cotizacion.fechaInicioVigencia ) : new Date( fechaInicio ), [ Validators.required ] ],
      fechaFinVigencia: [ this.fechaFinVegencia, [ Validators.required ] ],
      tomador: [ cotizacion ? cotizacion.tomador : null, [ Validators.required ] ],
      numeroDocumento: [ cotizacion ? cotizacion.numeroDocumento : null, [ Validators.required ] ],
      celular: [ cotizacion ? cotizacion.celular : null, [ Validators.required ] ],
      correo: [ cotizacion ? cotizacion.correo : null, [ Validators.required ] ],
      idAsesor: [ cotizacion ? cotizacion.idAsesor : null, [ Validators.required ] ],
      idSede: [ cotizacion ? cotizacion.idSede : null, [ Validators.required ] ],
      placa: [ cotizacion ? cotizacion.placa : null, [ Validators.required ] ],
      modelo: [ cotizacion ? cotizacion.modelo : null, [ Validators.required ] ],
      idTipoVehiculo: [ cotizacion ? cotizacion.idTipoVehiculo : null, [ Validators.required ] ],
      idUsuario: [ cotizacion ? cotizacion.idUsuario : null ],
      valorAsegurado: [ cotizacion ? cotizacion.valorAsegurado : null, [ Validators.required ] ]
    } );
    if ( cotizacion ) {
      this.listarAsesores( this.cotizacion.idSede, true );
    }
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
    if ( !this.cotizacion ) {
      this.fechaFinVegencia = new Date( fechaFinVigencia.format() );
    } else {
      this.fechaFinVegencia = this.cotizacion.fechaFinVigencia;
    }
  }

  onSubmit() {
    this.submitted = true;
    if ( this.formulario.valid ) {
      this.guardando = true;
      this.calcular( true );
    }
  }

  volver() {
    this.dismiss.emit( 'TABLA' );
  }

  obtenerDatos() {
    this.cotizacion = {} as any;
    this.cotizacion = this.formulario.value;
    const fechaInicio = moment( this.cotizacion.fechaInicioVigencia ).set( {
      hour: 0,
      minute: 0,
      second: 0
    } );
    const fechaFin = moment( this.cotizacion.fechaFinVigencia ).set( { hour: 0, minute: 0, second: 0 } );
    this.diasVigencia = moment( fechaFin ).diff( fechaInicio, 'days' );
  }

  calcular( guardar ) {
    this.calculando = true;
    this.obtenerDatos();
    this.tasaTipoVehiculoService.getByIdTipoVehiculo( this.cotizacion.idTipoVehiculo ).subscribe( res => {
      const temp = res.filter( x => this.cotizacion.modelo <= x.modeloHasta
        && this.cotizacion.modelo >= ( x.modeloDesde ? x.modeloDesde : 0 ) );
      const lista = res.sort( ( a, b ) => {
        return a.modeloHasta - b.modeloDesde;
      } );
      const ultimo = lista.pop();
      if ( temp.length > 0 ) {
        this.calculoValores( guardar, temp[ 0 ].tasa );
      } else if ( ultimo.modeloHasta < this.cotizacion.modelo ) {
        this.calculoValores( guardar, ultimo.tasa );
        this.calculando = false;
      }
      this.guardando = false;
    }, error => {
      this.guardando = false;
    } );
  }

  calculoValores( guardar, tasa ) {
    this.tasaAplicada = tasa;
    const prima = ( this.tasaAplicada / 100 ) * this.cotizacion.valorAsegurado;
    this.primaAnual = prima >= 730000 ? prima : 730000;
    this.subTotal = this.primaAnual + this.asistencias + this.accidentesPersonales;
    this.iva = ( this.subTotal - this.accidentesPersonales ) * 0.19;
    this.total = this.iva + this.subTotal;
    this.totalVigencia = ( ( this.total  / 365 ) * this.diasVigencia ) ;
    this.cotizacion.total = this.total;
    this.cotizacion.totalVigencia = this.totalVigencia;
    this.cotizacion.subTotal = this.subTotal;
    this.cotizacion.asistencias = this.asistencias + this.accidentesPersonales;
    this.cotizacion.iva = this.iva;
    this.cotizacion.primaAnual = this.primaAnual;
    this.cotizacion.tasaAplicada = this.tasaAplicada;
    this.cotizacion.diasVigencia = this.diasVigencia;
    this.cotizacion.fechaCotizacion = this.fechaCotizacion;
    this.cotizacion.fechaInicioVigencia = moment( this.cotizacion.fechaInicioVigencia ).format( 'YYYY/MM/DD' );
    this.cotizacion.fechaFinVigencia = moment( this.cotizacion.fechaFinVigencia ).format( 'YYYY/MM/DD' );
    this.calculando = false;
    this.calculado = true;
    if ( guardar ) {
      if ( this.cotizacion.id ) {
        this.cotizacionService.actualizar( this.cotizacion ).subscribe( rest => {
          this.dismiss.emit( 'TABLA' );
        }, error => {
          console.log( 'A ocurrido un error al guardar' );
        } );
      } else {
        this.cotizacionService.agregar( this.cotizacion ).subscribe( rest => {
          this.dismiss.emit( 'TABLA' );
        }, error => {
          console.log( 'A ocurrido un error al guardar' );
        } );
      }
    }
  }

  limpiarCalculo() {
    this.calculado = false;
  }

  listarAsesores( event, editar? ) {
    this.listaAsesores = [];
    this.formulario.controls.idAsesor.setValue( null );
    this.asesorService.getByIdSedeEnabled( editar ? event : event.value ).subscribe( res => {
      res.map( x => {
        this.listaAsesores.push( { value: x.id, label: x.nombre } );
      } );
      if ( editar ) {
        this.formulario.controls.idAsesor.setValue( this.cotizacion.idAsesor );
      }
    } );
  }
}
