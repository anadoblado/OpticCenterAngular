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
exports.CitasDataSource = exports.ListadoCitasComponent = void 0;
var core_1 = require("@angular/core");
var paginator_1 = require("@angular/material/paginator");
var collections_1 = require("@angular/cdk/collections");
var table_1 = require("@angular/material/table");
var ListadoCitasComponent = /** @class */ (function () {
    function ListadoCitasComponent(citasService, usuarioService, router) {
        this.citasService = citasService;
        this.usuarioService = usuarioService;
        this.router = router;
        this.nombresDeColumnas = ['fecha', 'graduacion', 'producto', 'imagenProducto', 'pago'];
    }
    /**
   * Hook a la inicialización del componente, compruebo si el usuario está autenticado, si no lo
   * está le remito a la pantalla de Login.
   */
    ListadoCitasComponent.prototype.ngOnInit = function () {
        var _this = this;
        //No hay citas si no se ha logueado el usuario
        this.usuarioService.getUsuarioAutenticado().subscribe(function (usuario) {
            if (usuario == null) {
                _this.router.navigate(['/login']);
            }
            else {
                _this.usuarioAutenticado = usuario;
            }
        });
        this.citasService.getListadoCitas().subscribe(function (data) {
            _this.listaCitas = data['citas'];
            _this.dataSourceTabla = new table_1.MatTableDataSource(data['citas']);
        });
    };
    /**
     * Hook a un momento del ciclo de vida del componente. Se lanza una vez que el componente se comienza
     * a mostrar
     */
    /*ngAfterViewInit() {
      this.configuraEtiquetasDelPaginador();
      this.actualizaListadoCitas();
    }*/
    /**
     * Configura las etiquetas y comportamiento del paginador
     */
    ListadoCitasComponent.prototype.configuraEtiquetasDelPaginador = function () {
        this.paginator._intl.itemsPerPageLabel = "Mensajes por página";
        this.paginator._intl.nextPageLabel = "Siguiente";
        this.paginator._intl.previousPageLabel = "Anterior";
        this.paginator._intl.firstPageLabel = "Primera";
        this.paginator._intl.lastPageLabel = "Última";
        this.paginator._intl.getRangeLabel = function (page, pageSize, length) {
            var start = page * pageSize + 1;
            var end = (page + 1) * pageSize;
            return start + " - " + end + " de " + length;
        };
    };
    /**
     * Realiza la petición de listado de mensajes al servidor y los asigna a la propiedad "listadoMensajes"
     * de esta clase
     */
    ListadoCitasComponent.prototype.actualizaListadoCitas = function () {
        //this.comunicacionAlertas.abrirDialogCargando(); // Pantalla de carga
        // Petición de mensajes al servicio
        // this.citasService.getListadoCitas().subscribe(data => {
        //if (data["result"] == "fail") { // Algo ha fallado
        //this.comunicacionAlertas.abrirDialogError('Imposible obtener los mensajes desde el servidor');
        //else { // Todo ha ido bien, se refresca el dataSourceTabla, con un nuevo MatTableDataSource.
        // this.listadoCitas = data;
        //this.dataSourceTabla = new MatTableDataSource<Cita>(this.listadoCitas.citas);
        //this.comunicacionAlertas.cerrarDialogo();
        //}
        // })
    };
    __decorate([
        core_1.ViewChild(paginator_1.MatPaginator)
    ], ListadoCitasComponent.prototype, "paginator");
    ListadoCitasComponent = __decorate([
        core_1.Component({
            selector: 'app-listado-citas',
            templateUrl: './listado-citas.component.html',
            styleUrls: ['./listado-citas.component.scss']
        })
    ], ListadoCitasComponent);
    return ListadoCitasComponent;
}());
exports.ListadoCitasComponent = ListadoCitasComponent;
var CitasDataSource = /** @class */ (function (_super) {
    __extends(CitasDataSource, _super);
    function CitasDataSource(citasService) {
        var _this = _super.call(this) || this;
        _this.citasService = citasService;
        return _this;
    }
    CitasDataSource.prototype.connect = function () {
        return this.citasService.getListadoCitas();
    };
    CitasDataSource.prototype.disconnect = function () { };
    return CitasDataSource;
}(collections_1.DataSource));
exports.CitasDataSource = CitasDataSource;
