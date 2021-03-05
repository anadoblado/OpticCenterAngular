import { Component, OnInit } from '@angular/core';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { DialogTypes } from '../dialogo-general/dialog-data-type';
import { AutenticadorJwtService } from '../../services/autenticador-jwt.service';
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/interfaces';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-barra-herramientas',
  templateUrl: './barra-herramientas.component.html',
  styleUrls: ['./barra-herramientas.component.scss']
})
export class BarraHerramientasComponent implements OnInit {

  usuarioAutenticado: Usuario;
  // Guardo el usuario autenticado
  // Necesito varios objetos inyectados en este componente
  constructor(private comunicacionAlertasService: ComunicacionDeAlertasService,
      private autenticacionPorJWT: AutenticadorJwtService,
      private router: Router,
      private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.usuariosService.cambiosEnUsuarioAutenticado.subscribe(nuevoUsuarioAutenticado => {
      this.usuarioAutenticado = nuevoUsuarioAutenticado;
    });
  }

  /**
   * El logo de la barra de herramientas nos llevará al listado de mensajes
   */
  navegarHaciaPrincipal() {
    if(this.usuarioAutenticado.rol == 'admin'){
      this.router.navigate(['/menuAdministrador']);
    }else{
      this.router.navigate(['/listadoCitas']);
    }
    
  }

  /**
   * Confirmación de que deseamos abandonar la sesión
   */
  confirmacionAbandonarSesion() {
    this.comunicacionAlertasService.abrirDialogConfirmacion ('¿Realmente desea abandonar la sesión?').subscribe(opcionElegida => {
      if (opcionElegida == DialogTypes.RESPUESTA_ACEPTAR) {
        this.autenticacionPorJWT.eliminaJWT();
        this.usuarioAutenticado = null;
        this.router.navigate(['/login']);
      }
    });
  }

  /**
   * Navegar hacia el componente de cambiar password
   */
  navegarHaciaCambiaPassword () {
    this.router.navigate(['/cambioPassword']);
  }


  /**
   * Navegar hacia el componente de modificación de los datos del usuario
   */
  navegarHaciaDatosPersonales () {
    this.router.navigate(['/mostrarUsuario']);
  }

  /**
   * Navegar hacia el componente para crear productos nuevos
   */
  navegarHaciaCrearProducto(){
    this.router.navigate(['/crearProducto']);
  }

  /**
   * Navegar hacia el componente que registrará usuarios nuevos
   */
  navegarHaciaCrearUsuario(){
    this.router.navigate(['/crearUsuario']);
  }

}
