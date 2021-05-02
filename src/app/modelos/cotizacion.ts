export interface Cotizacion {
  id: string;
  tomador: string;
  fechaCotizacion: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  asesor: string;
  idAsesor: string;
  sede: string;
  idSede: string;
  idUsuario: string;
  placa: string;
  modelo: string;
  correo: string;
  celular: string;
  idTipoVehiculo: string;
  numeroDocumento: string;
  valorAsegurado: number;
  primaAnual: number;
  asistencias: number;
  iva: number;
  total: number;
  subTotal: number;
  totalVigencia: number;
  diasVigencia: number;
  tasaAplicada: number;
}
