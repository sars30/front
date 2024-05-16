import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { prov } from 'src/app/models/prov';
import { Proveedor } from 'src/app/models/proveedor';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-add-edit-proveedor',
  templateUrl: './add-edit-proveedor.component.html',
  styleUrls: ['./add-edit-proveedor.component.css']
})
export class AddEditProveedorComponent {
  myForm!: FormGroup;
  accion = 'Crear';
  proveedor?: Proveedor;
  prov?: prov;
  prov1?: Proveedor;
  message2: boolean = false;
  element:any;
  nomRol: string = '';

  //vendeData: boolean;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar){}

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
        Id_Proveedor: ['', Validators.required],
        nombre: ['', [Validators.required, Validators.maxLength(80)]],
        estado: ['', [Validators.required, Validators.maxLength(1)]],
        telefono: ['', [Validators.required, Validators.maxLength(10)]]
      });

      const data = this._restService.getProveedor();
      this.prov1 = data;
      
      // Llama al método get del servicio _restService para traer los datos
      this.route.queryParams.subscribe(params => {
        //this.token = this._restService.getUserToken();
        const acc = params['accion'];
        this.accion = acc;

        if (this.accion === 'Editar' && this.prov1) {
          // Si es 'Editar', asigna los valores al formulario
          this.myForm.patchValue({
            Id_Proveedor: this.prov1.Id_Proveedor,
            nombre: this.prov1.nombre,
            estado: this.prov1.estado,
            telefono: this.prov1.telefono
          });
        }
      });
    }

    guardarProveedor(){
      this.prov1 = {
        Id_Proveedor: this.myForm.value.Id_Proveedor,
        nombre: this.myForm.value.nombre,
        estado: 1,
        telefono: this.myForm.value.telefono
      };

      if(this.accion == 'Crear'){
        this._restService.post('addProveedor', this.prov1).subscribe(respuesta =>{
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
        });
        this.resetCampos();
    }else {
      //traemos desde el formulario los datos ingresados
      //Llama al método post del servicio _restService para guardar los datos si es el formulario de edicion
      this._restService.post('updateProveedor', this.prov1).subscribe(respuesta =>{
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
    this.myForm.value.nombre ='',
    this.myForm.value.telefono =''
  }

    listarProveedor(){
      this.router.navigate(['/ListadoProveedores']);
    }
}
