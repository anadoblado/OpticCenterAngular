import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from "../interfaces/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  getListadoProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>('/productos/listar');
  }

  getProducto(id: number):Observable<Producto>{
    return this.http.get<Producto>('/producto/get?id=' + id).pipe();
  }

  crearNuevoProducto(referencia: String, color: number, precio: number, imagen: String): Observable<Producto> {
    var dto = {
      referencia: referencia,
      color: color,
      precio: precio,
      imagen: imagen
    };
    return this.http.post<Producto>('/producto/nuevo', dto);
  }
  
  modificarProducto(id: number, referencia: String, color: String, precio: number, imagen: String): Observable<Producto> {
    var dto = {
      id: id,
      referencia: referencia,
      color: color,
      precio: precio,
      imagen: imagen
    };
    return this.http.put<Producto>('/producto/update', dto);
  }
  deleteProducto(idProducto: number): Observable<String> {

    return this.http.delete<String>('/producto/delete?idproducto=' + idProducto);
  }
}
