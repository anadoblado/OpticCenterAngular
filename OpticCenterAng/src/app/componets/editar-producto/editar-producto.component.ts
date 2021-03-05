import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Producto } from 'src/app/interfaces/interfaces';
import { ComunicacionDeAlertasService } from 'src/app/services/comunicacion-de-alertas.service';
import { ProductoService } from 'src/app/services/producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.scss']
})
export class EditarProductoComponent implements OnInit {

  form: FormGroup;
  producto: Producto;
  idProducto: number;

  constructor(private comunicacionAlertas: ComunicacionDeAlertasService,
    private productoService: ProductoService,
    private rutaActiva: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.idProducto = this.rutaActiva.snapshot.params.id;
    this.cargarDatosProducto();
    this.form = new FormGroup({
      referencia: new FormControl(),
      color: new FormControl(),
      precio: new FormControl(),
      imagen: new FormControl(),
    });
  }

  cargarDatosProducto(){
    this.productoService.getProducto(this.idProducto).subscribe(producto => {
      console.log(producto);
      this.producto = producto;
      this.form.controls.referencia.setValue(this.producto.referencia);
      this.form.controls.color.setValue(this.producto.color);
      this.form.controls.precio.setValue(this.producto.precio);
      this.form.controls.imagen.setValue(this.producto.imagen);

    });
  }

  modificarProductoActual() {
    this.comunicacionAlertas.abrirDialogCargando();

    this.producto.id = this.idProducto;
    this.producto.referencia = this.form.controls.referencia.value;
    this.producto.color = this.form.controls.color.value;
    this.producto.precio = this.form.controls.precio.value;

    this.productoService.modificarProducto(this.producto.id, this.producto.referencia, this.producto.color, this.producto.precio, this.producto.imagen).subscribe(resultado => {
      if (resultado == null) {
        this.comunicacionAlertas.mostrarSnackBar('Error al crear el producto')
      }
      else {
        this.comunicacionAlertas.mostrarSnackBar('Producto modificado')
        this.comunicacionAlertas.cerrarDialogo();
        this.router.navigate(['/listadoProductos']);

      }
    });
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
