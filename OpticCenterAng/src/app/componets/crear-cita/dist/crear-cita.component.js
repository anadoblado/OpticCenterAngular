"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearCitaComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CrearCitaComponent = /** @class */ (function () {
    function CrearCitaComponent(comunicacionAlertas, usuarioService, productoService, citaService, router) {
        this.comunicacionAlertas = comunicacionAlertas;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
        this.citaService = citaService;
        this.router = router;
    }
    CrearCitaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productoService.getListadoProductos().subscribe(function (data) {
            _this.productos = data['productos'];
            console.log(_this.productos);
            _this.productos.forEach(function (producto) {
                _this.producto = producto;
            });
        });
        this.usuarioService.getListadoUsuarios().subscribe(function (data) {
            _this.usuarios = data['usuarios'];
            console.log(_this.usuarios);
            _this.usuarios.forEach(function (usuario) {
                _this.usuario = usuario;
            });
        });
        this.form = new forms_1.FormGroup({
            fecha: new forms_1.FormControl('', [forms_1.Validators.required]),
            graduacion: new forms_1.FormControl('', [forms_1.Validators.required]),
            id_usuario: new forms_1.FormControl(),
            id_producto: new forms_1.FormControl()
        });
        this.cita = {
            id: null,
            fecha: null,
            graduacion: null,
            id_usuario: null,
            id_producto: null
        };
    };
    CrearCitaComponent.prototype.crearCita = function () {
        var _this = this;
        this.citaService.crearNuevaCita(this.form.controls.fecha.value.getTime(), this.form.controls.graduacion.value, this.form.controls.id_usuario.value, this.form.controls.id_producto.value).subscribe(function (resultado) {
            console.log(resultado);
            if (resultado == null) {
                _this.comunicacionAlertas.mostrarSnackBar('Error al generar la cita');
            }
            else {
                _this.comunicacionAlertas.mostrarSnackBar("Visita registrada");
                _this.router.navigate(['/menuAdministrador']);
            }
        });
    };
    CrearCitaComponent = __decorate([
        core_1.Component({
            selector: 'app-crear-cita',
            templateUrl: './crear-cita.component.html',
            styleUrls: ['./crear-cita.component.scss']
        })
    ], CrearCitaComponent);
    return CrearCitaComponent;
}());
exports.CrearCitaComponent = CrearCitaComponent;
