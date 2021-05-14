export interface Usuario {
  _id: string;
  email: string;
  nombre: string;
  fechaCreacion: string;
  usuarioSistema: string;
  password: string;
  habilitado: boolean;
  rol: string;
}
