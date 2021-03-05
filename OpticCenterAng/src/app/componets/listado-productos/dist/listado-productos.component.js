"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductoDataSource = exports.ListadoProductosComponent = void 0;
var core_1 = require("@angular/core");
var collections_1 = require("@angular/cdk/collections");
var table_1 = require("@angular/material/table");
var ListadoProductosComponent = /** @class */ (function () {
    function ListadoProductosComponent(router, usuarioService, productoService) {
        this.router = router;
        this.usuarioService = usuarioService;
        this.productoService = productoService;
        this.nombreDeColumnas = ['id', 'referencia', 'color', 'precio', 'imagen'];
    }
    ListadoProductosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuarioService.getUsuarioAutenticado().subscribe(function (usuario) {
            if (usuario == null) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.usuarioAutenticado = usuario;
                // if(usuario.rol == "admin"){
                //   this.router.navigate(['/usuarios/listar']);
                // }
            }
        });
        this.productoService.getListadoProductos().subscribe(function (data) {
            _this.listadoProductos = data['productos'];
            console.log(_this.listadoProductos);
            _this.listadoProductos.forEach(function (producto) {
                _this.producto = producto;
            });
            _this.dataSourceTabla = new table_1.MatTableDataSource(data['productos']);
        });
    };
    ListadoProductosComponent.prototype.borrarProducto = function (idProducto) {
        var _this = this;
        this.productoService.deleteProducto(idProducto).subscribe(function (resultado) {
            _this.router.navigate(['/listadoProductos']);
            window.location.reload();
        });
    };
    ListadoProductosComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-productos',
            templateUrl: './listado-productos.component.html',
            styleUrls: ['./listado-productos.component.scss']
        })
    ], ListadoProductosComponent);
    return ListadoProductosComponent;
}());
exports.ListadoProductosComponent = ListadoProductosComponent;
var ProductoDataSource = /** @class */ (function (_super) {
    __extends(ProductoDataSource, _super);
    function ProductoDataSource(productoService) {
        var _this = _super.call(this) || this;
        _this.productoService = productoService;
        return _this;
    }
    ProductoDataSource.prototype.connect = function () {
        return this.productoService.getListadoProductos();
    };
    ProductoDataSource.prototype.disconnect = function () { };
    ;
    return ProductoDataSource;
}(collections_1.DataSource));
exports.ProductoDataSource = ProductoDataSource;
