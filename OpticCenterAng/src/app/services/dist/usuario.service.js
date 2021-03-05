"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var md5_1 = require("ts-md5/dist/md5"); // importamos la librería en el servicio que sirve para auntenticar
var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, router) {
        this.http = http;
        this.router = router;
        this.cambiosEnUsuarioAutenticado = new core_1.EventEmitter(); // Evento cuando el usuario autenticado ha cambiado
    }
    /**
     * Métotod que nos devolverá la lista de todos los usarios que tiene la óptica
     */
    UsuarioService.prototype.getListadoUsuarios = function () {
        return this.http.get('/usuarios/listar').pipe(operators_1.tap(function (data) { return console.log(data); }));
    };
    /**
     * Método para autenticar al usuario, recibiendo su nombre y su contraseña.
     * recoge un usuario y lo envía
     */
    UsuarioService.prototype.autenticaUsuario = function (dni, password) {
        var md5 = new md5_1.Md5(); // Creo un objeto que permite codificar en MD5
        var jsonObject = {
            dni: dni,
            password: md5.appendStr(password).end().toString() // Codifico en MD5 el password recibido
        };
        // return this.http.post<DatosConJwt>('http://localhost:8080/usuario/autentica', jsonObject).pipe(
        //   tap(data => {
        //     console.log("Desde tap miro los datos recibidos" + data["jwt"]); 
        //   })
        //);
        // Envío la petición http y devuelvo el Observable, para que cualquiera pueda subscribirse.
        return this.http.post('/usuario/autentica', jsonObject).pipe(operators_1.tap(function (data) {
            console.log("Desde tap miro los datos recibidos" + data["jwt"]);
        }));
    };
    /**
     * Permite obtener un usuario autenticado en el servidor.
     */
    UsuarioService.prototype.getUsuarioAutenticado = function (incluirImagen) {
        var _this = this;
        if (incluirImagen === void 0) { incluirImagen = false; }
        // Petición para obtener el usuario autenticado, funcionará porque se envía el JWT en 
        // cada petición, gracias al HttpInterceptor
        return this.http.get('/usuario/getAutenticado?imagen=' + incluirImagen)
            .pipe(operators_1.tap(function (usuarioAutenticado) {
            // En la condición del if intento detectar varios casos que provocan un cambio en 
            // el usuario autenticado
            if ((_this.usuarioAutenticado == null && usuarioAutenticado != null) || // No había usuario autenticado y ahora sí lo hay - Autenticación
                (_this.usuarioAutenticado != null && usuarioAutenticado == null) || // Había usuario autenticado y ya no lo hay - Cierre de sesión
                (_this.usuarioAutenticado != null && usuarioAutenticado != null && _this.usuarioAutenticado.id != usuarioAutenticado.id)) { // Cambio de usuario autenticado
                _this.emitirNuevoCambioEnUsuarioAutenticado();
                // guardo en variable de sesión el rol porque tiene distintos niveles de acceso
                var rolUsu = JSON.stringify({ "rol": usuarioAutenticado.rol });
                console.log("el rol es en el servicio: " + rolUsu);
                localStorage.setItem("rolUsuarioEnSession", rolUsu);
                _this.usuarioAutenticado = usuarioAutenticado;
                if (usuarioAutenticado.rol == "admin") {
                    _this.router.navigate(['menuAdministrador']);
                }
            }
        }));
    };
    /**
     * Es un método que podrá llamarse para permitir que cualquiera, que esté subscrito a
     * this.cambiosEnUsuarioAutenticado, sepa que el usuario autenticado ha cambiado.
     */
    UsuarioService.prototype.emitirNuevoCambioEnUsuarioAutenticado = function () {
        var _this = this;
        this.getUsuarioAutenticado(true).subscribe(function (usuarioAutenticado) {
            _this.cambiosEnUsuarioAutenticado.emit(usuarioAutenticado);
        });
    };
    UsuarioService.prototype.crearNuevoUsuario = function (nombre, apellidos, email, fechaNacimiento, dni, password, direccion, cp, municipio, telefono, imagen, rol) {
        var md5 = new md5_1.Md5();
        var dto = {
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            fechaNacimiento: fechaNacimiento,
            dni: dni,
            password: md5.appendStr(password).end().toString(),
            direccion: direccion,
            cp: cp,
            municipio: municipio,
            telefono: telefono,
            imagen: imagen,
            rol: rol
        };
        return this.http.post('/usuario/nuevo', dto);
    };
    UsuarioService.prototype.modificarUsuario = function (id, nombre, apellidos, email, fechaNacimiento, dni, password, direccion, cp, municipio, telefono, imagen, rol) {
        var dto = {
            id: id,
            nombre: nombre,
            apellidos: apellidos,
            email: email,
            fechaNacimiento: fechaNacimiento,
            dni: dni,
            password: password,
            direccion: direccion,
            cp: cp,
            municipio: municipio,
            telefono: telefono,
            imagen: imagen,
            rol: rol
        };
        return this.http.put('/usuario/update', dto);
    };
    UsuarioService.prototype.deleteUsuario = function (idUsuario) {
        return this.http["delete"]('/usuario/delete?idUsuario=' + idUsuario);
    };
    /**
     * Comprueba si una determinada contraseña es igual a la del usuario autenticado
     */
    UsuarioService.prototype.ratificaPasswordUsuarioAutenticado = function (password) {
        var dto = {
            'password': password
        };
        return this.http.post('/usuario/ratificaPassword', dto);
    };
    /**
    * Cambia la contraseña de un usuario por otra nueva
    */
    UsuarioService.prototype.cambiaPasswordUsuarioAutenticado = function (nuevaPassword) {
        var dto = {
            'password': nuevaPassword
        };
        return this.http.post('/usuario/modificaPassword', dto);
    };
    /**
     * Envia los datos de un usuario al servidor para su guardado
     */
    UsuarioService.prototype.actualizaDatosUsuario = function (usuario) {
        var _this = this;
        return this.http.post('/usuario/update', usuario)
            .pipe(operators_1.tap(function (strResult) {
            // Tras actualizar los datos del usuario emito un cambio en el EventEmitter, para comunicar a la 
            // barra de herramientas (que tiene un icono con datos del usuario) que ha habido cambios en los
            // datos del usuario autenticado
            _this.emitirNuevoCambioEnUsuarioAutenticado();
        }));
    };
    __decorate([
        core_1.Output()
    ], UsuarioService.prototype, "cambiosEnUsuarioAutenticado");
    UsuarioService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuarioService);
    return UsuarioService;
}());
exports.UsuarioService = UsuarioService;
