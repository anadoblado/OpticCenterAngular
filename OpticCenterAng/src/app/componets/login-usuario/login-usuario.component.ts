import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service'; 
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.scss']
})
export class LoginUsuarioComponent implements OnInit {

    // Propiedades de la clase
    loginForm: FormGroup; // Permite tener un objeto linkado a los campos del formulario de autenticación
    ocultarPassword: boolean = true; // Utilizado para conocer si se muestra u oculta el contenido del campo password
  
  
    /**
     * Le pido al inyector de código que genere objetos de determinados tipos, útiles
     */
    constructor(private usuarioService: UsuarioService, 
      private router: Router, 
      private autenticadorJwtService: AutenticadorJwtService,
      private comunicacionAlertas: ComunicacionDeAlertasService) { }

  /**
   * Hook al momento de inicialización del componente
   */
  ngOnInit(): void {
    // Inicializo el objeto FormGroup, es la base para usar formularios reactivos, en los que la validación
    // y el control son muy fáciles de realizar.
    this.loginForm = new FormGroup({
      dni: new FormControl ('74916373z', [Validators.required, Validators.minLength(9)]),
      password: new FormControl ('1234', [Validators.required])
    });
  }

  /**
   * Método que autentica un usuario con los valores expuestos en el formulario del template
   */
  autenticaUsuario() {
    // Inicio un diálogo de carga
    this.comunicacionAlertas.abrirDialogCargando();
    // Utilizo el "UsuarioService" para enviar los datos de logado y subscribirme a la respuesta del 
    // servidor
    this.usuarioService.autenticaUsuario(this.loginForm.controls.dni.value,
      this.loginForm.controls.password.value).subscribe(data => {
        if (data.jwt != undefined) {
          this.autenticadorJwtService.almacenaJWT(data.jwt); // Almaceno un nuevo JWT
          this.router.navigate(['/listadoCitas']); // Navego hasta listado de mensajes
          this.comunicacionAlertas.cerrarDialogo(); // Cierro el diálogo de espera
          this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); // Emito evento de cambio en usuario autenticado
        } 
        else {
          this.comunicacionAlertas.abrirDialogError('El dni y contraseña introducidos no permiten el acceso');
        }
      });
  }

}
