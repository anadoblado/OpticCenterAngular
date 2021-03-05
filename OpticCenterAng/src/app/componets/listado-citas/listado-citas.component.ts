import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { ListadoCitas, Cita, Usuario } from '../../interfaces/interfaces';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { CitasService } from '../../services/citas.service';
import { ComunicacionDeAlertasService } from '../../services/comunicacion-de-alertas.service';
import { DataSource } from '@angular/cdk/collections';
import { SelectionModel } from '@angular/cdk/collections';
import { UsuarioService } from '../../services/usuario.service';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listado-citas',
  templateUrl: './listado-citas.component.html',
  styleUrls: ['./listado-citas.component.scss']
})
export class ListadoCitasComponent implements OnInit {

  usuarioAutenticado: Usuario;
  //listadoCitas: ListadoCitas = {citas: [], totalCitas: 0};
  listaCitas: Cita[];

  // Las tablas en material funcionan con su propio origen de datos, llamado MatTableDataSource, basado en 
  // rows (filas). Nosotros parametrizamos el MatTableDataSource para indicar que recibimos datos de tipo 
  // "Mensaje" y en el constructor del MatTableDataSource pasamos el array de mensajes
  dataSourceTabla: MatTableDataSource<Cita>;
  nombresDeColumnas: string[] = ['fecha', 'graduacion', 'producto', 'imagenProducto', 'pago'];

  // El decorador @ViewChild permite acceder a un subelemento de este component, del tipo especificado. En
  // este caso es del tipo MatPaginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private citasService: CitasService, 
    private usuarioService: UsuarioService, 
    private router: Router) { }

    /**
   * Hook a la inicialización del componente, compruebo si el usuario está autenticado, si no lo
   * está le remito a la pantalla de Login.
   */
  ngOnInit(): void {
    //No hay citas si no se ha logueado el usuario
    this.usuarioService.getUsuarioAutenticado().subscribe(usuario => {
      if (usuario == null){
        this.router.navigate(['/login']);
      }else{
        this.usuarioAutenticado = usuario;
      }
    });

    this.citasService.getListadoCitas().subscribe(data => {
      this.listaCitas = data['citas'];
      
        this.dataSourceTabla = new MatTableDataSource<Cita>(data['citas']);
      
      
    });
  }

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
  private configuraEtiquetasDelPaginador() {
    this.paginator._intl.itemsPerPageLabel = "Mensajes por página";
    this.paginator._intl.nextPageLabel = "Siguiente";
    this.paginator._intl.previousPageLabel = "Anterior";
    this.paginator._intl.firstPageLabel = "Primera";
    this.paginator._intl.lastPageLabel = "Última";
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const start = page * pageSize + 1;
      const end = (page + 1) * pageSize;
      return `${start} - ${end} de ${length}`;
    };
  }

  /**
   * Realiza la petición de listado de mensajes al servidor y los asigna a la propiedad "listadoMensajes"
   * de esta clase
   */
  actualizaListadoCitas() {
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
  }

}

export class CitasDataSource extends DataSource<any>{
  constructor(private citasService: CitasService){
    super();
  }
  connect(): Observable<Cita[]>{
    return this.citasService.getListadoCitas();
  }
  disconnect(){}
}
