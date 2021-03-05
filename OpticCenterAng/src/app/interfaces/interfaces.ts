// Sólo usada para recibir un objeto que contenga un campo llamado "jwt". Usado en la autenticación del usuario
export interface DatosConJwt{
    jwt:string;
}

export interface Usuario {
    id: number;
    nombre: string;
    apellidos: string;
    email: string;
    fechaNacimiento: Date;
    dni: string;
    password: string;
    direccion: string;
    cp: number;
    municipio: string;
    telefono: string;
    imagen: string;
    rol: string;
  }

  export interface Producto {
      id: number;
      referencia: string;
      color: string;
      precio: number;
      imagen: string;
  }

  export interface Cita{
      id: number;
      fecha: Date;
      graduacion: string;
      id_usuario: UsuarioMinimo;
      id_producto: number[];
  }

  export interface ListadoCitas{
      citas: Cita[];
      totalCitas: number;
  }

  export interface UsuarioMinimo{
      id: number;
      dni: string;
  }

  export interface ProductoMinimo{
      id: number;
      referecnia: string;
  }