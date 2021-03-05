import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginUsuarioComponent } from './componets/login-usuario/login-usuario.component';
import { ListadoCitasComponent } from './componets/listado-citas/listado-citas.component';
import { BarraHerramientasComponent } from './componets/barra-herramientas/barra-herramientas.component';
import { HttpInterceptorService } from './services/http-interceptor.service';

import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { DialogoGeneralComponent } from './componets/dialogo-general/dialogo-general.component';
import { ImagenUsuarioComponent } from './componets/imagen-usuario/imagen-usuario.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListadoUsuariosComponent } from './componets/listado-usuarios/listado-usuarios.component';
import { MenuAdministradorComponent } from './componets/menu-administrador/menu-administrador.component';
import { ListadoProductosComponent } from './componets/listado-productos/listado-productos.component';
import { EditarProductoComponent } from './componets/editar-producto/editar-producto.component';
import { CrearProductoComponent } from './componets/crear-producto/crear-producto.component';
import { CrearUsuarioComponent } from './componets/crear-usuario/crear-usuario.component';
import { FechaComponent } from './componets/fecha/fecha.component';
import { CambioPasswordComponent } from './componets/cambio-password/cambio-password.component';
import { CrearCitaComponent } from './componets/crear-cita/crear-cita.component';
import { MostrarUsuarioComponent } from './componets/mostrar-usuario/mostrar-usuario.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginUsuarioComponent,
    ListadoCitasComponent,
    BarraHerramientasComponent,
    DialogoGeneralComponent,
    ImagenUsuarioComponent,
    ListadoUsuariosComponent,
    MenuAdministradorComponent,
    ListadoProductosComponent,
    EditarProductoComponent,
    CrearProductoComponent,
    CrearUsuarioComponent,
    FechaComponent,
    CambioPasswordComponent,
    CrearCitaComponent,
    MostrarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatDividerModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
              {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
