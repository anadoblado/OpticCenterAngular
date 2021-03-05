"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MostrarUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var MostrarUsuarioComponent = /** @class */ (function () {
    function MostrarUsuarioComponent(comunicacionAlertas, usuarioService, router) {
        this.comunicacionAlertas = comunicacionAlertas;
        this.usuarioService = usuarioService;
        this.router = router;
    }
    MostrarUsuarioComponent.prototype.ngOnInit = function () {
        this.cargarDatosUsuarioAutenticado();
        //formulario que se cargará con los datos del usuario
        this.form = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            apellidos: new forms_1.FormControl('', [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            fechaNacimiento: new forms_1.FormControl('', [forms_1.Validators.required]),
            dni: new forms_1.FormControl('', [forms_1.Validators.required]),
            direccion: new forms_1.FormControl('', [forms_1.Validators.required]),
            cp: new forms_1.FormControl('', [forms_1.Validators.required]),
            municipio: new forms_1.FormControl('', [forms_1.Validators.required]),
            telefono: new forms_1.FormControl('', [forms_1.Validators.required]),
            imagen: new forms_1.FormControl(),
            rol: new forms_1.FormControl()
        });
    };
    // le pongo los datos del usuario
    MostrarUsuarioComponent.prototype.cargarDatosUsuarioAutenticado = function () {
        var _this = this;
        this.usuarioService.getUsuarioAutenticado(true).subscribe(function (usuario) {
            _this.usuario = usuario;
            _this.form.controls.nombre.setValue(_this.usuario.nombre);
            _this.form.controls.apellidos.setValue(_this.usuario.apellidos);
            _this.form.controls.email.setValue(_this.usuario.email);
            _this.form.controls.fechaNacimiento.setValue(new Date(_this.usuario.fechaNacimiento));
            _this.form.controls.dni.setValue(_this.usuario.dni);
            _this.form.controls.direccion.setValue(_this.usuario.direccion);
            _this.form.controls.cp.setValue(_this.usuario.cp);
            _this.form.controls.municipio.setValue(_this.usuario.municipio);
            _this.form.controls.telefono.setValue(_this.usuario.telefono);
        });
    };
    MostrarUsuarioComponent.prototype.actualizaDatos = function () {
        var _this = this;
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
        this.usuarioService.actualizaDatosUsuario(this.usuario).subscribe(function (resultado) {
            if (resultado["result"] == "fail") {
                _this.comunicacionAlertas.abrirDialogError("Error al actualizar los datos del usuario. Prueba otra vez");
            }
            else {
                _this.comunicacionAlertas.abrirDialogInfo('Usuario actualizado correctamente').subscribe(function (result) {
                    if (_this.usuario.rol != "admin") {
                        _this.router.navigate(['/listadoCitas']);
                    }
                    else {
                        _this.router.navigate(['/menuAdministrador']);
                    }
                });
            }
        });
    };
    /**
     * No hago nada y vuelvo al listado de mensajes
     */
    MostrarUsuarioComponent.prototype.cancelar = function () {
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
    };
    MostrarUsuarioComponent.prototype.usuarioSeleccionaFicheroImagen = function () {
        var _this = this;
        var inputNode = document.querySelector('#file'); // Obtengo el control etiquetado en Angular como #file
        if (typeof (FileReader) !== 'undefined') { // tomo una precaución para comprobar que puedo utilizar el tipo FileReader
            var reader = new FileReader(); // Instancio un FileReader()
            // Pido al objeto reader que lea el primer (y único) fichero seleccionado por el control etiquetado como #file.
            // esta acción no es inmediata, es asíncrona, ya que no sabemos el tiempo que un lector de ficheros tardará en leer
            // fichero. Todo depende del tamaño del archivo.
            // Cuando el lector termine se disparará su evento "onload()", que se encuentra en este fichero, línea 112.
            reader.readAsArrayBuffer(inputNode.files[0]);
            // Cuando el objeto reader termina de leer el fichero seleccionado por el usuario, dispara su evento "onload()"
            reader.onload = function (e) {
                // transformo el contenido del fichero leído, en la variable "e" a una cadena de texto codificada en Base64.
                // Además lo cargo en el campo this.usuario.imagen. Esto provocará que la imagen del html cambie, ya que dicha
                // imagen muestra, en todo momento, el valor de this.usuario.imagen
                _this.usuario.imagen = btoa(new Uint8Array(e.target.result)
                    .reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));
            };
        }
    };
    MostrarUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-mostrar-usuario',
            templateUrl: './mostrar-usuario.component.html',
            styleUrls: ['./mostrar-usuario.component.scss']
        })
    ], MostrarUsuarioComponent);
    return MostrarUsuarioComponent;
}());
exports.MostrarUsuarioComponent = MostrarUsuarioComponent;
