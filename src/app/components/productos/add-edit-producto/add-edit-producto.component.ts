import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Prod } from 'src/app/models/prod';
import { Producto } from 'src/app/models/producto';
import { Usuario } from 'src/app/models/usuario';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-add-edit-producto',
  templateUrl: './add-edit-producto.component.html',
  styleUrls: ['./add-edit-producto.component.css']
})
export class AddEditProductoComponent {

  myForm!: FormGroup;
  accion = 'Crear';
  token: any;
  producto?: Producto;
  product?: Producto;
  product1?: Prod;
  message2: boolean = false;
  usuarios: Usuario[] = [];
  ced: number = 0;
  element:any;
  nomRol: string = '';


  //vendeData: boolean;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar){
      this._restService.getData('seeUsuario').subscribe(
        (response: any) => {
          // Verifica que la respuesta tenga la propiedad "mensaje" y que "mensaje" sea un array
          if (response && response.mensaje && Array.isArray(response.mensaje)) {
            // Asigna los productos obtenidos del servicio a la variable local
            this.usuarios = response.mensaje;
            this.usuarios.forEach(usuario => {
              console.log(usuario.Cedula);
              this.ced = usuario.Cedula;
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
      this.element = document.getElementById("menu_xd");
    
      // Cambia su estilo para mostrarlo
      this.element.style.display = "flex";
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
        Id_Producto: ['', Validators.required],
        Nombre: ['', [Validators.required, Validators.maxLength(30)]],
        Descripcion: ['', [Validators.required, Validators.maxLength(50)]],
        estado: ['', [Validators.required]],
        Usuario: ['', [Validators.required]],
     });

     const data = this._restService.getProducto();
     this.producto = data;
      
      // Llama al método get del servicio _restService para traer los datos
      this.route.queryParams.subscribe(params => {
        //this.token = this._restService.getUserToken();
        const acc = params['accion'];
        this.accion = acc;
        //this.vendeData = this._restService.getVendedorData();
        //this.startTokenVerification();
        //valida si esta en el metodo editar para setear los valores en el formulario
        if (this.accion === 'Editar' && this.producto) {
          // Si es 'Editar', asigna los valores al formulario
          this.myForm.patchValue({
            Id_Producto: this.producto.Id_Producto,
            Nombre: this.producto.Nombre,
            Descripcion: this.producto.Descripcion,
            estado: this.producto.estado,
            Cedula: this.producto.Cedula
          });
        }
      });
    }

    listarProducto(){
      this.router.navigate(['/ListadoProductos']);
    }

    guardarProducto(){
      this.product = { 
        Id_Producto: this.myForm.value.Id_Producto,
        Nombre: this.myForm.value.Nombre,
        Descripcion: this.myForm.value.Descripcion,
        estado: 1,
        Cedula: this.ced,
      }
      console.log(this.product)

      if(this.accion == 'Crear'){
        this._restService.post('addProducto', this.product).subscribe(respuesta =>{
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
        this._restService.post('updateProducto', this.producto).subscribe(respuesta =>{
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
      this.myForm.value.Nombre ='',
      this.myForm.value.Descripcion = '',
      this.myForm.value.estado ='',
      this.myForm.value.Cedula =''
    }
}
