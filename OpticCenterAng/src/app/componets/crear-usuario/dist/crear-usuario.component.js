"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CrearUsuarioComponent = /** @class */ (function () {
    function CrearUsuarioComponent(comunicacionAlertas, usuarioService, router) {
        this.comunicacionAlertas = comunicacionAlertas;
        this.usuarioService = usuarioService;
        this.router = router;
        this.ocultarPassword = true;
    }
    CrearUsuarioComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            nombre: new forms_1.FormControl('', [forms_1.Validators.required]),
            apellidos: new forms_1.FormControl('', [forms_1.Validators.required]),
            email: new forms_1.FormControl('', [forms_1.Validators.required]),
            fechaNacimiento: new forms_1.FormControl('', [forms_1.Validators.required]),
            dni: new forms_1.FormControl('', [forms_1.Validators.required]),
            password: new forms_1.FormControl('', [forms_1.Validators.required]),
            direccion: new forms_1.FormControl('', [forms_1.Validators.required]),
            cp: new forms_1.FormControl('', [forms_1.Validators.required]),
            municipio: new forms_1.FormControl('', [forms_1.Validators.required]),
            telefono: new forms_1.FormControl('', [forms_1.Validators.required]),
            imagen: new forms_1.FormControl(),
            rol: new forms_1.FormControl()
        });
        this.usuario = {
            id: null,
            nombre: null,
            apellidos: null,
            email: null,
            fechaNacimiento: null,
            dni: null,
            password: null,
            direccion: null,
            cp: null,
            municipio: null,
            telefono: null,
            imagen: null,
            rol: null
        };
    };
    CrearUsuarioComponent.prototype.crearUsuario = function () {
        var _this = this;
        this.usuarioService.crearNuevoUsuario(this.form.controls.nombre.value, this.form.controls.apellidos.value, this.form.controls.email.value, this.form.controls.fechaNacimiento.value.getTime(), this.form.controls.dni.value, this.form.controls.password.value, this.form.controls.direccion.value, this.form.controls.cp.value, this.form.controls.municipio.value, this.form.controls.telefono.value, this.usuario.imagen, this.form.controls.rol.value).subscribe(function (resultado) {
            if (resultado == null) {
                _this.comunicacionAlertas.mostrarSnackBar('Error al crear el usuario');
            }
            else {
                _this.comunicacionAlertas.mostrarSnackBar('Usuario añadido al registro');
                _this.router.navigate(['/listadoUsuarios']);
            }
        });
    };
    CrearUsuarioComponent.prototype.usuarioSeleccionaFicheroImagen = function () {
        var _this = this;
        var inputNode = document.querySelector('#file');
        if (typeof (FileReader) !== 'undefined') {
            var reader = new FileReader();
            reader.readAsArrayBuffer(inputNode.files[0]);
            reader.onload = function (e) {
                _this.usuario.imagen = btoa(new Uint8Array(e.target.result)
                    .reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));
            };
        }
    };
    CrearUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-crear-usuario',
            templateUrl: './crear-usuario.component.html',
            styleUrls: ['./crear-usuario.component.scss']
        })
    ], CrearUsuarioComponent);
    return CrearUsuarioComponent;
}());
exports.CrearUsuarioComponent = CrearUsuarioComponent;
