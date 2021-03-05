import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.scss']
})
export class CrearProductoComponent implements OnInit {

  form: FormGroup;
  producto: Producto;

  constructor(private comunicacionAlertas: ComunicacionDeAlertasService,
    private productoService: ProductoService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      referencia: new FormControl(),
      color: new FormControl(),
      precio: new FormControl(),
      imagen: new FormControl(),
    });

    this.producto = {
      id: null,
      referencia: null,
      color: null,
      precio: null,
      imagen: null,
    }
  }

  crearProducto() {
    this.productoService.crearNuevoProducto(this.form.controls.referencia.value, this.form.controls.color.value, this.form.controls.precio.value, this.producto.imagen).subscribe(resultado => {
      if (resultado == null) {
        this.comunicacionAlertas.mostrarSnackBar('Error al crear el producto')
      }
      else {
        this.comunicacionAlertas.mostrarSnackBar('Producto añadido')
        this.router.navigate(['/listadoProductos']);
      }
    })
  }

  
  productoSeleccionaFicheroImagen() {
    const inputNode: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.readAsArrayBuffer(inputNode.files[0]);

      reader.onload = (e: any) => {
        this.producto.imagen = btoa(
          new Uint8Array(e.target.result)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      };
    }
  }

}
