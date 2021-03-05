"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CitasService = void 0;
var core_1 = require("@angular/core");
// el decorador para que el injector cree una instancia de esta clase en el constructor de otras clases
var CitasService = /** @class */ (function () {
    /**
     *
     * @param http el http permite hacer peticiones asíncronas
     * en el constructor creo variables
     */
    function CitasService(http) {
        this.http = http;
    }
    CitasService.prototype.getListadoCitas = function () {
        return this.http.get('/citas/listar');
    };
    CitasService.prototype.crearNuevaCita = function (fecha, graduacion, id_usuario, id_producto) {
        var dto = {
            fecha: fecha,
            graduacion: graduacion,
            id_usuario: id_usuario,
            id_producto: id_producto
        };
        return this.http.post('/cita/nueva', dto);
    };
    CitasService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CitasService);
    return CitasService;
}());
exports.CitasService = CitasService;
