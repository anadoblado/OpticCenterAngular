import { Component, OnInit } from '@angular/core';
import { Producto, Usuario } from "../../interfaces/interfaces";
import { Router } from "@angular/router";
import { ProductoService } from "../../services/producto.service";
import { UsuarioService } from '../../services/usuario.service';
import { DataSource } from "@angular/cdk/collections";
import { Observable } from 'rxjs';
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.scss']
})
export class ListadoProductosComponent implements OnInit {

  usuarioAutenticado: Usuario;
  producto: Producto;
  listadoProductos: Producto[];
  dataSourceTabla: MatTableDataSource<Producto>;
  nombreDeColumnas: string[] = ['id', 'referencia', 'color', 'precio', 'imagen'];

  constructor(private router: Router, 
    private usuarioService: UsuarioService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario => {
      if (usuario == null){
        this.router.navigate(['/login']);  
      }else{
        this.usuarioAutenticado = usuario;
        // if(usuario.rol == "admin"){
        //   this.router.navigate(['/usuarios/listar']);
        // }
      }
    });

      this.productoService.getListadoProductos().subscribe(data => {
        this.listadoProductos = data['productos'];
        console.log(this.listadoProductos);
        this.listadoProductos.forEach(producto => {
          this.producto = producto;
        })
        this.dataSourceTabla = new MatTableDataSource<Producto>(data['productos']);
      });
    
  }

  borrarProducto(idProducto) {
    this.productoService.deleteProducto(idProducto).subscribe(resultado => {
        this.router.navigate(['/listadoProductos']); 
        window.location.reload();
    })
  }
}



export class ProductoDataSource extends DataSource<any>{
  constructor(private productoService: ProductoService){
    super();
  }
  connect(): Observable<Producto[]>{
    return this.productoService.getListadoProductos();
  }
  disconnect(){};
}
