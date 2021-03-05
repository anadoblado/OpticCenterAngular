import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { UsuarioService } from "../../services/usuario.service";

@Component({
  selector: 'app-mostrar-usuario',
  templateUrl: './mostrar-usuario.component.html',
  styleUrls: ['./mostrar-usuario.component.scss']
})
export class MostrarUsuarioComponent implements OnInit {

  form: FormGroup;
  usuario: Usuario;

  constructor(private comunicacionAlertas: ComunicacionDeAlertasService,
    private usuarioService: UsuarioService, 
    private router: Router) { }

  ngOnInit(): void {

    this.cargarDatosUsuarioAutenticado();
    //formulario que se cargará con los datos del usuario
    this.form = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      cp: new FormControl('', [Validators.required]),
      municipio: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      imagen: new FormControl(),
      rol: new FormControl(),
    });

    
  }

  // le pongo los datos del usuario
  cargarDatosUsuarioAutenticado(){
    this.usuarioService.getUsuarioAutenticado(true).subscribe(usuario => {
      this.usuario = usuario;
      this.form.controls.nombre.setValue(this.usuario.nombre);
      this.form.controls.apellidos.setValue(this.usuario.apellidos);
      this.form.controls.email.setValue(this.usuario.email);
      this.form.controls.fechaNacimiento.setValue(new Date(this.usuario.fechaNacimiento));
      this.form.controls.dni.setValue(this.usuario.dni);
      this.form.controls.direccion.setValue(this.usuario.direccion);
      this.form.controls.cp.setValue(this.usuario.cp);
      this.form.controls.municipio.setValue(this.usuario.municipio);
      this.form.controls.telefono.setValue(this.usuario.telefono);
    });
  }


  actualizaDatos(){
    this.comunicacionAlertas.abrirDialogCargando();

    // repasa los campos del formulario y recoge los valores que haya en el this.usuario
    this.usuario.nombre = this.form.controls.nombre.value;
    this.usuario.apellidos = this.form.controls.apellidos.value;
    this.usuario.email = this.form.controls.email.value;
    this.usuario.fechaNacimiento = this.form.controls.fechaNacimiento.value.getTime();
    this.usuario.dni = this.form.controls.dni.value;
    this.usuario.direccion = this.form.controls.direccion.value;
    this.usuario.cp = this.form.controls.cp.value;
    this.usuario.municipio = this.form.controls.municipio.value;
    this.usuario.telefono = this.form.controls.telefono.value;

    // mandamos los valores del this.usuario al usuarioService y esperamos respuesta del servidor
    this.usuarioService.actualizaDatosUsuario(this.usuario).subscribe(resultado => {
      if (resultado["result"] == "fail"){
        this.comunicacionAlertas.abrirDialogError("Error al actualizar los datos del usuario. Prueba otra vez");
      }else{
        this.comunicacionAlertas.abrirDialogInfo('Usuario actualizado correctamente').subscribe(result => {
          if(this.usuario.rol != "admin"){
            this.router.navigate(['/listadoCitas']);
          }else{
            this.router.navigate(['/menuAdministrador']);
          }
          
        });
      }
    });
  }

  /**
   * No hago nada y vuelvo al listado de mensajes
   */
  cancelar() {
    var rolUsuario = JSON.parse(localStorage.getItem("rolUsuarioEnSession"));
    console.log("el rol después de parsear " + rolUsuario.rol);

    var rol = rolUsuario.rol;

    console.log("rol guardado: " + rol);

    if(rol != "admin"){
      this.router.navigate(['/listadoCitas']);
    }else{
      this.router.navigate(['/menuAdministrador']);
    }
  }

  usuarioSeleccionaFicheroImagen() {
    const inputNode: any = document.querySelector('#file'); // Obtengo el control etiquetado en Angular como #file

    if (typeof (FileReader) !== 'undefined') { // tomo una precaución para comprobar que puedo utilizar el tipo FileReader
      const reader = new FileReader(); // Instancio un FileReader()

      // Pido al objeto reader que lea el primer (y único) fichero seleccionado por el control etiquetado como #file.
      // esta acción no es inmediata, es asíncrona, ya que no sabemos el tiempo que un lector de ficheros tardará en leer
      // fichero. Todo depende del tamaño del archivo.
      // Cuando el lector termine se disparará su evento "onload()", que se encuentra en este fichero, línea 112.
      reader.readAsArrayBuffer(inputNode.files[0]);

      // Cuando el objeto reader termina de leer el fichero seleccionado por el usuario, dispara su evento "onload()"
      reader.onload = (e: any) => {
        // transformo el contenido del fichero leído, en la variable "e" a una cadena de texto codificada en Base64.
        // Además lo cargo en el campo this.usuario.imagen. Esto provocará que la imagen del html cambie, ya que dicha
        // imagen muestra, en todo momento, el valor de this.usuario.imagen
        this.usuario.imagen = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }
}
