export interface Cotizacion {
  _id: string;
  tomador: string;
  fechaCotizacion: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  asesor: string;
  idAsesor: string;
  sedeName: string;
  sede: string;
  usuario: string;
  placa: string;
  modelo: string;
  correo: string;
  celular: string;
  tipoVehiculo: string;
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
