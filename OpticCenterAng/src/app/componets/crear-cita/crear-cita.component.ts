import { Component, OnInit } from '@angular/core';
import { Cita, Usuario, Producto, ProductoMinimo, UsuarioMinimo } from "../../interfaces/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from "../../services/usuario.service";
import { ProductoService } from '../../services/producto.service';
import { CitasService } from '../../services/citas.service';


@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.scss']
})
export class CrearCitaComponent implements OnInit {

  form: FormGroup;
  cita: Cita;
  usuario: Usuario;
  producto: Producto;
  usuarios: Usuario[];
  productos: Producto[];

  constructor(private comunicacionAlertas: ComunicacionDeAlertasService,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
    private citaService: CitasService,
    private router: Router ) { }

  ngOnInit(): void {

    this.productoService.getListadoProductos().subscribe(data=>{
      this.productos = data['productos'];
      console.log(this.productos);
      this.productos.forEach(producto => {
        this.producto = producto;
      })
    });

    this.usuarioService.getListadoUsuarios().subscribe(data =>{
      this.usuarios = data['usuarios'];
      console.log(this.usuarios);
      this.usuarios.forEach(usuario => {
        this.usuario = usuario;
      })
    });



    this.form = new FormGroup({
      fecha: new FormControl('', [Validators.required]),
      graduacion: new FormControl('', [Validators.required]),
      id_usuario: new FormControl(),
      id_producto: new FormControl(),

    });

    this.cita = {
      id: null,
      fecha: null,
      graduacion: null,
      id_usuario: null,
      id_producto: null,
    }

  }

  crearCita(){
    this.citaService.crearNuevaCita(
      this.form.controls.fecha.value.getTime(),
      this.form.controls.graduacion.value,
      this.form.controls.id_usuario.value,
      this.form.controls.id_producto.value,
    ).subscribe(resultado => {
      console.log(resultado);
      if (resultado == null){
        this.comunicacionAlertas.mostrarSnackBar('Error al generar la cita');
      }else{

        this.comunicacionAlertas.mostrarSnackBar("Visita registrada");
        this.router.navigate(['/menuAdministrador']);
      }
    })
  }

}
