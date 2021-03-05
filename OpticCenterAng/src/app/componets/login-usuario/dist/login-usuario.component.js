"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginUsuarioComponent = /** @class */ (function () {
    /**
     * Le pido al inyector de código que genere objetos de determinados tipos, útiles
     */
    function LoginUsuarioComponent(usuarioService, router, autenticadorJwtService, comunicacionAlertas) {
        this.usuarioService = usuarioService;
        this.router = router;
        this.autenticadorJwtService = autenticadorJwtService;
        this.comunicacionAlertas = comunicacionAlertas;
        this.ocultarPassword = true; // Utilizado para conocer si se muestra u oculta el contenido del campo password
    }
    /**
     * Hook al momento de inicialización del componente
     */
    LoginUsuarioComponent.prototype.ngOnInit = function () {
        // Inicializo el objeto FormGroup, es la base para usar formularios reactivos, en los que la validación
        // y el control son muy fáciles de realizar.
        this.loginForm = new forms_1.FormGroup({
            dni: new forms_1.FormControl('74916373z', [forms_1.Validators.required, forms_1.Validators.minLength(9)]),
            password: new forms_1.FormControl('1234', [forms_1.Validators.required])
        });
    };
    /**
     * Método que autentica un usuario con los valores expuestos en el formulario del template
     */
    LoginUsuarioComponent.prototype.autenticaUsuario = function () {
        var _this = this;
        // Inicio un diálogo de carga
        this.comunicacionAlertas.abrirDialogCargando();
        // Utilizo el "UsuarioService" para enviar los datos de logado y subscribirme a la respuesta del 
        // servidor
        this.usuarioService.autenticaUsuario(this.loginForm.controls.dni.value, this.loginForm.controls.password.value).subscribe(function (data) {
            if (data.jwt != undefined) {
                _this.autenticadorJwtService.almacenaJWT(data.jwt); // Almaceno un nuevo JWT
                _this.router.navigate(['/listadoCitas']); // Navego hasta listado de mensajes
                _this.comunicacionAlertas.cerrarDialogo(); // Cierro el diálogo de espera
                _this.usuarioService.emitirNuevoCambioEnUsuarioAutenticado(); // Emito evento de cambio en usuario autenticado
            }
            else {
                _this.comunicacionAlertas.abrirDialogError('El dni y contraseña introducidos no permiten el acceso');
            }
        });
    };
    LoginUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-login-usuario',
            templateUrl: './login-usuario.component.html',
            styleUrls: ['./login-usuario.component.scss']
        })
    ], LoginUsuarioComponent);
    return LoginUsuarioComponent;
}());
exports.LoginUsuarioComponent = LoginUsuarioComponent;
