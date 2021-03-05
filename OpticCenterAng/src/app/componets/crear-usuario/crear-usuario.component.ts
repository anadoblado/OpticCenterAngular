import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from "../../services/usuario.service";


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.scss']
})
export class CrearUsuarioComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario;
  ocultarPassword: boolean = true;

  constructor(private comunicacionAlertas: ComunicacionDeAlertasService,
    private usuarioService: UsuarioService, 
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      password: new FormControl( '', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      imagen: new FormControl(),
      rol: new FormControl(),
    });

    this.usuario = {
      id: null,
      nombre: null,
      apellidos:null,
      email: null,
      fechaNacimiento: null,
      dni:null,
      password: null,
      direccion: null,
      cp: null,
      municipio: null,
      telefono: null,
      imagen: null,
      rol:null,
    }
  }

  crearUsuario() {
    this.usuarioService.crearNuevoUsuario(
      this.form.controls.nombre.value, 
      this.form.controls.apellidos.value, 
      this.form.controls.email.value, 
      this.form.controls.fechaNacimiento.value.getTime(), 
      this.form.controls.dni.value, 
      this.form.controls.password.value, 
      this.form.controls.direccion.value, 
      this.form.controls.cp.value, 
      this.form.controls.municipio.value, 
      this.form.controls.telefono.value, 
      this.usuario.imagen, 
      this.form.controls.rol.value,).subscribe(resultado => {
      if (resultado == null) {
        this.comunicacionAlertas.mostrarSnackBar('Error al crear el usuario')
      }
      else {
        this.comunicacionAlertas.mostrarSnackBar('Usuario añadido al registro');
        this.router.navigate(['/listadoUsuarios']);
      }
    })
  }

  usuarioSeleccionaFicheroImagen() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onload = (e: any) => {
        this.usuario.imagen = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

}
