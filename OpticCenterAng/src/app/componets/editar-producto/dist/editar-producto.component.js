"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarProductoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditarProductoComponent = /** @class */ (function () {
    function EditarProductoComponent(comunicacionAlertas, productoService, rutaActiva, router) {
        this.comunicacionAlertas = comunicacionAlertas;
        this.productoService = productoService;
        this.rutaActiva = rutaActiva;
        this.router = router;
    }
    EditarProductoComponent.prototype.ngOnInit = function () {
        this.idProducto = this.rutaActiva.snapshot.params.id;
        this.cargarDatosProducto();
        this.form = new forms_1.FormGroup({
            referencia: new forms_1.FormControl(),
            color: new forms_1.FormControl(),
            precio: new forms_1.FormControl(),
            imagen: new forms_1.FormControl()
        });
    };
    EditarProductoComponent.prototype.cargarDatosProducto = function () {
        var _this = this;
        this.productoService.getProducto(this.idProducto).subscribe(function (producto) {
            console.log(producto);
            _this.producto = producto;
            _this.form.controls.referencia.setValue(_this.producto.referencia);
            _this.form.controls.color.setValue(_this.producto.color);
            _this.form.controls.precio.setValue(_this.producto.precio);
            _this.form.controls.imagen.setValue(_this.producto.imagen);
        });
    };
    EditarProductoComponent.prototype.modificarProductoActual = function () {
        var _this = this;
        this.comunicacionAlertas.abrirDialogCargando();
        this.producto.id = this.idProducto;
        this.producto.referencia = this.form.controls.referencia.value;
        this.producto.color = this.form.controls.color.value;
        this.producto.precio = this.form.controls.precio.value;
        this.productoService.modificarProducto(this.producto.id, this.producto.referencia, this.producto.color, this.producto.precio, this.producto.imagen).subscribe(function (resultado) {
            if (resultado == null) {
                _this.comunicacionAlertas.mostrarSnackBar('Error al crear el producto');
            }
            else {
                _this.comunicacionAlertas.mostrarSnackBar('Producto modificado');
                _this.comunicacionAlertas.cerrarDialogo();
                _this.router.navigate(['/listadoProductos']);
            }
        });
    };
    EditarProductoComponent.prototype.productoSeleccionaFicheroImagen = function () {
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
    EditarProductoComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-producto',
            templateUrl: './editar-producto.component.html',
            styleUrls: ['./editar-producto.component.scss']
        })
    ], EditarProductoComponent);
    return EditarProductoComponent;
}());
exports.EditarProductoComponent = EditarProductoComponent;
