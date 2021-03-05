import { Injectable, Output, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import {DatosConJwt} from '../interfaces/interfaces';
import { Md5 } from 'ts-md5/dist/md5'; // importamos la librería en el servicio que sirve para auntenticar
import { Usuario } from '../interfaces/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarioAutenticado: Usuario; // Para almacenar el usuario autenticado
  @Output()  
  cambiosEnUsuarioAutenticado = new EventEmitter<Usuario>(); // Evento cuando el usuario autenticado ha cambiado

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Métotod que nos devolverá la lista de todos los usarios que tiene la óptica
   */
  getListadoUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('/usuarios/listar').pipe(
      tap(data=>console.log(data)),
    );
  }

  /**
   * Método para autenticar al usuario, recibiendo su nombre y su contraseña.
   * recoge un usuario y lo envía
   */

  autenticaUsuario(dni: string, password: string): Observable<DatosConJwt>{
    const md5 = new Md5(); // Creo un objeto que permite codificar en MD5
    var jsonObject ={
      dni: dni, // utilizo el id de los campos del formulario
      password: md5.appendStr(password).end().toString()  // Codifico en MD5 el password recibido
    };

    // return this.http.post<DatosConJwt>('http://localhost:8080/usuario/autentica', jsonObject).pipe(
    //   tap(data => {
    //     console.log("Desde tap miro los datos recibidos" + data["jwt"]); 
    //   })
    //);

    // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
    return this.http.post<DatosConJwt>('/usuario/autentica', jsonObject).pipe(
      tap(data => {
        console.log("Desde tap miro los datos recibidos" + data["jwt"]); 
      })
    );
    
  }

  /**
   * Permite obtener un usuario autenticado en el servidor.
   */
  getUsuarioAutenticado(incluirImagen: boolean = false): Observable<Usuario> {
    // Petición para obtener el usuario autenticado, funcionará porque se envía el JWT en 
    // cada petición, gracias al HttpInterceptor
    return this.http.get<Usuario>('/usuario/getAutenticado?imagen=' + incluirImagen)
    .pipe(
      tap(usuarioAutenticado => {
        // En la condición del if intento detectar varios casos que provocan un cambio en 
        // el usuario autenticado
        if ( (this.usuarioAutenticado == null && usuarioAutenticado != null) || // No había usuario autenticado y ahora sí lo hay - Autenticación
          (this.usuarioAutenticado != null && usuarioAutenticado == null) ||  // Había usuario autenticado y ya no lo hay - Cierre de sesión
          (this.usuarioAutenticado != null && usuarioAutenticado != null && this.usuarioAutenticado.id != usuarioAutenticado.id) ) { // Cambio de usuario autenticado
            this.emitirNuevoCambioEnUsuarioAutenticado();
            // guardo en variable de sesión el rol porque tiene distintos niveles de acceso
            var rolUsu = JSON.stringify({"rol": usuarioAutenticado.rol});
            console.log("el rol es en el servicio: " + rolUsu);

            localStorage.setItem("rolUsuarioEnSession", rolUsu);
            this.usuarioAutenticado = usuarioAutenticado;
            if(usuarioAutenticado.rol == "admin"){
              this.router.navigate(['menuAdministrador']);
            }
          }
      })
    );
  }

  /**
   * Es un método que podrá llamarse para permitir que cualquiera, que esté subscrito a 
   * this.cambiosEnUsuarioAutenticado, sepa que el usuario autenticado ha cambiado.
   */
  emitirNuevoCambioEnUsuarioAutenticado () {
    this.getUsuarioAutenticado(true).subscribe(usuarioAutenticado => {
      this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
    });
  }

  crearNuevoUsuario(nombre: String, apellidos: String, email: String, fechaNacimiento: Date, dni: String, password: string, direccion: String, cp: number, municipio: String, telefono: String, imagen: String, rol: String):Observable<Usuario>{
    const md5 = new Md5();
    var dto = {
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      fechaNacimiento: fechaNacimiento,
      dni: dni,
      password: md5.appendStr(password).end().toString(),
      direccion: direccion,
      cp: cp,
      municipio: municipio,
      telefono: telefono,
      imagen:imagen,
      rol: rol,
    };

    return this.http.post<Usuario>('/usuario/nuevo', dto);
  }

  modificarUsuario(id: number,nombre: String, apellidos: String, email: String, fechaNacimiento: Date, dni: String, password: String, direccion: String, cp: number, municipio: String, telefono: String, imagen: String, rol: String):Observable<Usuario>{
    var dto = {
      id: id,
      nombre: nombre,
      apellidos: apellidos,
      email: email,
      fechaNacimiento: fechaNacimiento,
      dni: dni,
      password: password,
      direccion: direccion,
      cp: cp,
      municipio: municipio,
      telefono: telefono,
      imagen:imagen,
      rol: rol,
    };
    return this.http.put<Usuario>('/usuario/update', dto);
  }

  deleteUsuario(idUsuario: number): Observable<String>{
    return this.http.delete<String>('/usuario/delete?idUsuario=' + idUsuario);
  }

  /**
   * Comprueba si una determinada contraseña es igual a la del usuario autenticado
   */
  ratificaPasswordUsuarioAutenticado (password: string) : Observable<object> {
    var dto = {
      'password': password
    };
    return this.http.post<object>('/usuario/ratificaPassword', dto);
  }


   /**
   * Cambia la contraseña de un usuario por otra nueva
   */
  cambiaPasswordUsuarioAutenticado (nuevaPassword: string) : Observable<object> {
    var dto = {
      'password': nuevaPassword
    };
    return this.http.post<object>('/usuario/modificaPassword', dto);
  }



  /**
   * Envia los datos de un usuario al servidor para su guardado
   */
  actualizaDatosUsuario (usuario: Usuario) {  
    return this.http.post<String>('/usuario/update', usuario)
    .pipe (
      tap(strResult => {
        // Tras actualizar los datos del usuario emito un cambio en el EventEmitter, para comunicar a la 
        // barra de herramientas (que tiene un icono con datos del usuario) que ha habido cambios en los
        // datos del usuario autenticado
        this.emitirNuevoCambioEnUsuarioAutenticado();
      }));
  }


}


