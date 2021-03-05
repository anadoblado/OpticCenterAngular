"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearProductoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CrearProductoComponent = /** @class */ (function () {
    function CrearProductoComponent(comunicacionAlertas, productoService, router) {
        this.comunicacionAlertas = comunicacionAlertas;
        this.productoService = productoService;
        this.router = router;
    }
    CrearProductoComponent.prototype.ngOnInit = function () {
        this.form = new forms_1.FormGroup({
            referencia: new forms_1.FormControl(),
            color: new forms_1.FormControl(),
            precio: new forms_1.FormControl(),
            imagen: new forms_1.FormControl()
        });
        this.producto = {
            id: null,
            referencia: null,
            color: null,
            precio: null,
            imagen: null
        };
    };
    CrearProductoComponent.prototype.crearProducto = function () {
        var _this = this;
        this.productoService.crearNuevoProducto(this.form.controls.referencia.value, this.form.controls.color.value, this.form.controls.precio.value, this.producto.imagen).subscribe(function (resultado) {
            if (resultado == null) {
                _this.comunicacionAlertas.mostrarSnackBar('Error al crear el producto');
            }
            else {
                _this.comunicacionAlertas.mostrarSnackBar('Producto añadido');
                _this.router.navigate(['/listadoProductos']);
            }
        });
    };
    CrearProductoComponent.prototype.productoSeleccionaFicheroImagen = function () {
        var _this = this;
        var inputNode = document.querySelector('#file');
        if (typeof (FileReader) !== 'undefined') {
            var reader = new FileReader();
            reader.readAsArrayBuffer(inputNode.files[0]);
            reader.onload = function (e) {
                _this.producto.imagen = btoa(new Uint8Array(e.target.result)
                    .reduce(function (data, byte) { return data + String.fromCharCode(byte); }, ''));
            };
        }
    };
    CrearProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-crear-producto',
            templateUrl: './crear-producto.component.html',
            styleUrls: ['./crear-producto.component.scss']
        })
    ], CrearProductoComponent);
    return CrearProductoComponent;
}());
exports.CrearProductoComponent = CrearProductoComponent;
