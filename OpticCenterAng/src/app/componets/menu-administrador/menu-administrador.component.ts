import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';

@Component({
  selector: 'app-menu-administrador',
  templateUrl: './menu-administrador.component.html',
  styleUrls: ['./menu-administrador.component.scss']
})
export class MenuAdministradorComponent implements OnInit {

  constructor( private router: Router, 
               private comunicacionAlertas: ComunicacionDeAlertasService) { }

  ngOnInit(): void {
  }

  navegarHaciaListadoUsuarios(){
    this.router.navigate(['/listadoUsuarios']);
  }

  navegarHaciaListadoProductos(){
    this.router.navigate(['/listadoProductos']);
  }

  navegarACitaNueva(){
    this.router.navigate(['/citaNueva']);
  }

}
