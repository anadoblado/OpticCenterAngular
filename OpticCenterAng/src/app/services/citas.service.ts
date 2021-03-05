import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cita } from '../interfaces/interfaces';


// el decorador para que el injector cree una instancia de esta clase en el constructor de otras clases
@Injectable({
  providedIn: 'root'
})

export class CitasService {

  /**
   * 
   * @param http el http permite hacer peticiones asíncronas
   * en el constructor creo variables
   */
  constructor(private http: HttpClient) { }


  getListadoCitas(): Observable<Cita[]>{
    return this.http.get<Cita[]>('/citas/listar');
  }

  crearNuevaCita(fecha: Date, graduacion: String, id_usuario: number, id_producto: number): Observable<Cita>{
    var dto = {
      fecha: fecha,
      graduacion: graduacion,
      id_usuario: id_usuario,
      id_producto: id_producto,
    };
    return this.http.post<Cita>('/cita/nueva', dto);
  }
}
