"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BarraHerramientasComponent = void 0;
var core_1 = require("@angular/core");
var dialog_data_type_1 = require("../dialogo-general/dialog-data-type");
var BarraHerramientasComponent = /** @class */ (function () {
    // Guardo el usuario autenticado
    // Necesito varios objetos inyectados en este componente
    function BarraHerramientasComponent(comunicacionAlertasService, autenticacionPorJWT, router, usuariosService) {
        this.comunicacionAlertasService = comunicacionAlertasService;
        this.autenticacionPorJWT = autenticacionPorJWT;
        this.router = router;
        this.usuariosService = usuariosService;
    }
    BarraHerramientasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuariosService.cambiosEnUsuarioAutenticado.subscribe(function (nuevoUsuarioAutenticado) {
            _this.usuarioAutenticado = nuevoUsuarioAutenticado;
        });
    };
    /**
     * El logo de la barra de herramientas nos llevará al listado de mensajes
     */
    BarraHerramientasComponent.prototype.navegarHaciaPrincipal = function () {
        if (this.usuarioAutenticado.rol == 'admin') {
            this.router.navigate(['/menuAdministrador']);
        }
        else {
            this.router.navigate(['/listadoCitas']);
        }
    };
    /**
     * Confirmación de que deseamos abandonar la sesión
     */
    BarraHerramientasComponent.prototype.confirmacionAbandonarSesion = function () {
        var _this = this;
        this.comunicacionAlertasService.abrirDialogConfirmacion('¿Realmente desea abandonar la sesión?').subscribe(function (opcionElegida) {
            if (opcionElegida == dialog_data_type_1.DialogTypes.RESPUESTA_ACEPTAR) {
                _this.autenticacionPorJWT.eliminaJWT();
                _this.usuarioAutenticado = null;
                _this.router.navigate(['/login']);
            }
        });
    };
    /**
     * Navegar hacia el componente de cambiar password
     */
    BarraHerramientasComponent.prototype.navegarHaciaCambiaPassword = function () {
        this.router.navigate(['/cambioPassword']);
    };
    /**
     * Navegar hacia el componente de modificación de los datos del usuario
     */
    BarraHerramientasComponent.prototype.navegarHaciaDatosPersonales = function () {
        this.router.navigate(['/mostrarUsuario']);
    };
    /**
     * Navegar hacia el componente para crear productos nuevos
     */
    BarraHerramientasComponent.prototype.navegarHaciaCrearProducto = function () {
        this.router.navigate(['/crearProducto']);
    };
    /**
     * Navegar hacia el componente que registrará usuarios nuevos
     */
    BarraHerramientasComponent.prototype.navegarHaciaCrearUsuario = function () {
        this.router.navigate(['/crearUsuario']);
    };
    BarraHerramientasComponent = __decorate([
        core_1.Component({
            selector: 'app-barra-herramientas',
            templateUrl: './barra-herramientas.component.html',
            styleUrls: ['./barra-herramientas.component.scss']
        })
    ], BarraHerramientasComponent);
    return BarraHerramientasComponent;
}());
exports.BarraHerramientasComponent = BarraHerramientasComponent;
