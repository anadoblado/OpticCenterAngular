import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoCitasComponent } from './componets/listado-citas/listado-citas.component';
import { ListadoUsuariosComponent } from './componets/listado-usuarios/listado-usuarios.component';
import { LoginUsuarioComponent } from './componets/login-usuario/login-usuario.component';
import { MenuAdministradorComponent} from './componets/menu-administrador/menu-administrador.component';
import { ListadoProductosComponent } from "./componets/listado-productos/listado-productos.component";
import { EditarProductoComponent } from "./componets/editar-producto/editar-producto.component";
import { CrearProductoComponent } from "./componets/crear-producto/crear-producto.component";
import { CrearUsuarioComponent } from './componets/crear-usuario/crear-usuario.component';
import { CambioPasswordComponent } from "./componets/cambio-password/cambio-password.component";
import { CrearCitaComponent } from './componets/crear-cita/crear-cita.component';
import { MostrarUsuarioComponent } from "./componets/mostrar-usuario/mostrar-usuario.component";


const routes: Routes = [
  
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginUsuarioComponent },
  { path: 'listadoCitas', component: ListadoCitasComponent },
  { path: 'listadoUsuarios', component: ListadoUsuariosComponent},
  { path: 'menuAdministrador', component: MenuAdministradorComponent},
  { path: 'listadoProductos', component: ListadoProductosComponent},
  { path: 'edit/:id', component: EditarProductoComponent},
  { path: 'crearProducto', component: CrearProductoComponent},
  { path: 'crearUsuario', component: CrearUsuarioComponent},
  { path: 'cambioPassword', component: CambioPasswordComponent},
  { path: 'citaNueva', component: CrearCitaComponent},
  { path: 'mostrarUsuario', component: MostrarUsuarioComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
