"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var listado_citas_component_1 = require("./componets/listado-citas/listado-citas.component");
var listado_usuarios_component_1 = require("./componets/listado-usuarios/listado-usuarios.component");
var login_usuario_component_1 = require("./componets/login-usuario/login-usuario.component");
var menu_administrador_component_1 = require("./componets/menu-administrador/menu-administrador.component");
var listado_productos_component_1 = require("./componets/listado-productos/listado-productos.component");
var editar_producto_component_1 = require("./componets/editar-producto/editar-producto.component");
var crear_producto_component_1 = require("./componets/crear-producto/crear-producto.component");
var crear_usuario_component_1 = require("./componets/crear-usuario/crear-usuario.component");
var cambio_password_component_1 = require("./componets/cambio-password/cambio-password.component");
var crear_cita_component_1 = require("./componets/crear-cita/crear-cita.component");
var mostrar_usuario_component_1 = require("./componets/mostrar-usuario/mostrar-usuario.component");
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: login_usuario_component_1.LoginUsuarioComponent },
    { path: 'listadoCitas', component: listado_citas_component_1.ListadoCitasComponent },
    { path: 'listadoUsuarios', component: listado_usuarios_component_1.ListadoUsuariosComponent },
    { path: 'menuAdministrador', component: menu_administrador_component_1.MenuAdministradorComponent },
    { path: 'listadoProductos', component: listado_productos_component_1.ListadoProductosComponent },
    { path: 'edit/:id', component: editar_producto_component_1.EditarProductoComponent },
    { path: 'crearProducto', component: crear_producto_component_1.CrearProductoComponent },
    { path: 'crearUsuario', component: crear_usuario_component_1.CrearUsuarioComponent },
    { path: 'cambioPassword', component: cambio_password_component_1.CambioPasswordComponent },
    { path: 'citaNueva', component: crear_cita_component_1.CrearCitaComponent },
    { path: 'mostrarUsuario', component: mostrar_usuario_component_1.MostrarUsuarioComponent },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
