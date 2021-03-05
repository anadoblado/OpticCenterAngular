import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/interfaces';
import { Router } from "@angular/router";
import { UsuarioService } from "../../services/usuario.service";
import { DataSource } from "@angular/cdk/collections";
import { Observable } from "rxjs";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.scss']
})
export class ListadoUsuariosComponent implements OnInit {

  usuarioAutenticado: Usuario;
  listadoUsuarios: Usuario[];
  dataSourceTabla: MatTableDataSource<Usuario>;
  nombreDeColumnas: string[] = ['id', 'dni', 'nombre', 'apellidos'];

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

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


    this.usuarioService.getListadoUsuarios().subscribe(data => {
      this.listadoUsuarios = data['usuarios'];
      
        this.dataSourceTabla = new MatTableDataSource<Usuario>(data['usuarios']);
  });

}
}

export class UsuariosDataSource extends DataSource<any>{
  constructor(private usuarioService: UsuarioService){
    super();
  }
  connect(): Observable<Usuario[]>{
    return this.usuarioService.getListadoUsuarios();
  }
  disconnect(){};
}
