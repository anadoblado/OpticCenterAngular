"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CambioPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var md5_1 = require("ts-md5/dist/md5");
var CambioPasswordComponent = /** @class */ (function () {
    function CambioPasswordComponent(router, usuarioService, comunicacionAlertas) {
        this.router = router;
        this.usuarioService = usuarioService;
        this.comunicacionAlertas = comunicacionAlertas;
        this.hideActual = true; // Utilizado para mostrar u ocultar la contraseña actual
        this.hideNueva = true; // Utilizado para mostrar u ocultar la nueva contraseña
    }
    CambioPasswordComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            actual: new forms_1.FormControl('', [forms_1.Validators.required]),
            nueva: new forms_1.FormControl('', [forms_1.Validators.required])
        });
    };
    CambioPasswordComponent.prototype.actualizarPassword = function () {
        var _this = this;
        // Compruebo si la contraseña escrita es real para el usuario autenticado
        this.comunicacionAlertas.abrirDialogCargando();
        var actualEncriptada = this.encriptaMD5(this.form.controls.actual.value); // Encripto la contraseña con MD5
        // Hago la petición al servicio de usuario, para ratificar la contraseña
        this.usuarioService.ratificaPasswordUsuarioAutenticado(actualEncriptada).subscribe(function (resultado) {
            console.log(resultado); // Por si quieres ver lo que llega del servidor
            if (resultado["result"] == 'fail') { // El servicio responde con un fallo al comprobar la contraseña
                _this.comunicacionAlertas.abrirDialogError('La contraseña actual introducida no es válida o no se puede comprobar');
            }
            else { // Se ha ratificado la contraseña actual, se lanza el cambio de contraseña
                // Lanzo la llamada al cambio de contraseña
                var nuevaEncriptada = _this.encriptaMD5(_this.form.controls.nueva.value); // Encripto la nueva contraseña
                // Envio al servicio la petición de cambio de contraseña
                _this.usuarioService.cambiaPasswordUsuarioAutenticado(nuevaEncriptada).subscribe(function (resultado) {
                    if (resultado["result"] == 'fail') { // Se obtiene fallo
                        _this.comunicacionAlertas.abrirDialogError('Error al actualizar la contraseña. Inténtelo más tarde.');
                    }
                    else { // todo ok.
                        _this.comunicacionAlertas.abrirDialogInfo('Contraseña actualizada').subscribe(function (result) {
                            _this.router.navigate(['/listadoCitas']); // Vuelvo al listado de mensajes
                        });
                    }
                });
            }
        });
    };
    /**
     * Encripta un texto en MD5
     */
    CambioPasswordComponent.prototype.encriptaMD5 = function (texto) {
        var md5 = new md5_1.Md5();
        return md5.appendStr(texto).end().toString();
    };
    /**
     * Cancela el cambio de contraseña, vuelve al listado
     */
    CambioPasswordComponent.prototype.cancelar = function () {
        var rolUsuario = JSON.parse(localStorage.getItem("rolUsuarioEnSession"));
        console.log("el rol después de parsear " + rolUsuario.rol);
        var rol = rolUsuario.rol;
        console.log("rol guardado: " + rol);
        if (rol != "admin") {
            this.router.navigate(['/listadoCitas']);
        }
        else {
            this.router.navigate(['/menuAdministrador']);
        }
        // if( rol != null){
        //   if(rol == "admin"){
        //     this.router.navigate(['/menuAdministrador']);
        //   }
        // }else{
        //   this.router.navigate(['/listadoCitas']);   
        // }
    };
    CambioPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-cambio-password',
            templateUrl: './cambio-password.component.html',
            styleUrls: ['./cambio-password.component.scss']
        })
        /**
         * Permite cambiar la contraseña de los usuarios y usuarias registradas
         */
    ], CambioPasswordComponent);
    return CambioPasswordComponent;
}());
exports.CambioPasswordComponent = CambioPasswordComponent;
