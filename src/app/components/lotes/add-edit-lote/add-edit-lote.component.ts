import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { lote } from 'src/app/models/lote';
import { Producto } from 'src/app/models/producto';
import { Proveedor } from 'src/app/models/proveedor';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component'

@Component({
  selector: 'app-add-edit-lote',
  templateUrl: './add-edit-lote.component.html',
  styleUrls: ['./add-edit-lote.component.css']
})
export class AddEditLoteComponent {

  myForm!: FormGroup;
  accion = 'Crear';
  token: any;
  lote?: lote;
  lote1?: lote;
  message2: boolean = false;
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  id_prov: number = 0;
  id_prod?: number = 0;
  nomProd: string = '';
  element:any;
  nomRol: string = '';

  //vendeData: boolean;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar){
      this._restService.getData('seeProducto').subscribe(
        (response: any) => {
          // Verifica que la respuesta tenga la propiedad "mensaje" y que "mensaje" sea un array
          if (response && response.mensaje && Array.isArray(response.mensaje)) {
            // Asigna los productos obtenidos del servicio a la variable local
            this.productos = response.mensaje;
            this.productos.forEach(producto => {
              //console.log(producto.Id_Producto);
              this.id_prod = producto.Id_Producto;
              this.nomProd = producto.Nombre;
            });
          } else {
            console.error('La respuesta del servicio no tiene el formato esperado:', response);
          }
        },
        error => {
          // Handle error
          console.error('Error fetching products:', error);
        }
      );

      this._restService.getData('seeProveedor').subscribe(
        (response: any) => {
          // Verifica que la respuesta tenga la propiedad "mensaje" y que "mensaje" sea un array
          if (response && response.mensaje && Array.isArray(response.mensaje)) {
            // Asigna los proveedores obtenidos del servicio a la variable local
            this.proveedores = response.mensaje;
            this.proveedores.forEach(proveedor => {
              //console.log(proveedor.Id_Proveedor);
              this.id_prov = proveedor.Id_Proveedor;
            });
          } else {
            console.error('La respuesta del servicio no tiene el formato esperado:', response);
          }
        },
        error => {
          // Handle error
          console.error('Error fetching providers:', error);
        }
      );
      
    }

    ngOnInit( ){ 
      this.nomRol = this._restService.getNomRol();
      if(this.nomRol == 'empleado'){
        this.element = document.getElementById("menu_xd");
        // Cambia su estilo para mostrarlo
        this.element.style.display = "none";
        this._restService.setNomRol(this.nomRol);
        console.log('Nombre del rol:', this.nomRol);
      }else if(this.nomRol == 'admin'){
        this.element = document.getElementById("menu_xd");
        // Cambia su estilo para mostrarlo
        this.element.style.display = "flex";
      }else{
        this.element = document.getElementById("menu_xd");
        // Cambia su estilo para mostrarlo
        this.element.style.display = "none";
      }
      this.myForm = this.fb.group({
        Cod_Lote: ['', [Validators.required, Validators.maxLength(30)]],
        Fecha_ingreso: ['', Validators.required],
        Fecha_fabri: ['', Validators.required],
        Fecha_venc: ['', Validators.required],
        Unidades: ['', [Validators.required, Validators.maxLength(5)]],
        Descripcion: ['', [Validators.required, Validators.maxLength(100)]], 
        producto: ['', [Validators.required]],
        proveedor: ['', [Validators.required]]
      });
      const data = this._restService.getLote();
      this.lote1 = data;
      // Llama al método get del servicio _restService para traer los datos
      this.route.queryParams.subscribe(params => {
        //this.token = this._restService.getUserToken();
        const acc = params['accion'];
        this.accion = acc;
        //this.vendeData = this._restService.getVendedorData();
        //this.startTokenVerification();
        //valida si esta en el metodo editar para setear los valores en el formulario
        if (this.accion === 'Editar' && this.lote1) {
          // Si es 'Editar', asigna los valores al formulario
          this.myForm.patchValue({
            Cod_Lote: this.lote1.Cod_Lote,
            Fecha_ingreso: this.lote1.Fecha_ingreso,
            Fecha_fabri: this.lote1.Fecha_fabri,
            Fecha_venc: this.lote1.Fecha_venc,
            Unidades: this.lote1.Unidades,
            Descripcion: this.lote1.Descripcion, 
            //prod: this.nomProd,
            Id_Producto: this.lote1.Id_Producto,
            Id_Proveedor: this.lote1.Id_Proveedor
          });
          //console.log(this.lote1)
        }
      });
    }

    listarLote(){
      this.router.navigate(['/ListadoLotes']);
    }

    guardarLote(){
      this.lote = {
        Cod_Lote: this.myForm.value.Cod_Lote,
        Fecha_ingreso: this.myForm.value.Fecha_ingreso,
        Fecha_fabri: this.myForm.value.Fecha_fabri,
        Fecha_venc: this.myForm.value.Fecha_venc,
        Unidades: this.myForm.value.Unidades,
        Descripcion: this.myForm.value.Descripcion, 
        Id_Producto: this.id_prod,
        Id_Proveedor: this.id_prov,
        estado: 1
      }

      console.log(this.lote)

      if(this.accion == 'Crear'){
        this._restService.post('addLote', this.lote).subscribe(respuesta =>{
          console.log(this.lote)
          if(respuesta.codigo === 200){
            console.log("exito")
            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Datos guardados con éxtio!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = true; 
          }else if (respuesta.codigo === 400) {
            console.log("datos incorrectos");
            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '!Los datos ingresados no son válidos o tienen errores!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = false;
          } else if (respuesta.codigo === 404) {
            console.log("no encontrado");

            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Algo salió mal!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = false;
          }else {
            console.log("error no controlado");

            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Ocurrió un error desconocido!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });
            
            this.message2 = false;
          }
        })
        this.resetCampos();
      }else {
        //traemos desde el formulario los datos ingresados
        //Llama al método post del servicio _restService para guardar los datos si es el formulario de edicion
        this._restService.post('updateLote', this.lote).subscribe(respuesta =>{
          //this.token = this._restService.getUserToken();
          if(respuesta.codigo === 200){
            console.log("exito")
            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Datos guardados con éxtio!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = true;

          }else if (respuesta.codigo === 400) { 
            console.log(this.lote)
            console.log("datos incorrectos");
            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Los datos ingresados no son válidos o tienen errores!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = false;

          } else if (respuesta.codigo === 404) {
            console.log("no encontrado");
            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Ocurrió un error desconocido!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = false;

          }else {
            console.log("error no controlado");

            const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
              width: '250px',
              data: {mensaje: '¡Algo salió mal!' },
            });

            dialogRef.afterClosed().subscribe(result => {
              this.resetCampos();
            });

            this.message2 = false;
          }
        })
        this.resetCampos();
      } 
    }

    resetCampos(){
      this.myForm.value.Cod_Lote ='',
      this.myForm.value.Fecha_ingreso = '',
      this.myForm.value.Fecha_fabri ='',
      this.myForm.value.Fecha_venc ='',
      this.myForm.value.Unidades ='',
      this.myForm.value.Descripcion ='',
      this.myForm.value.Id_Producto ='',
      this.myForm.value.Id_Proveedor = ''
    }

}
