import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-add-edit-rol',
  templateUrl: './add-edit-rol.component.html',
  styleUrls: ['./add-edit-rol.component.css']
})
export class AddEditRolComponent {
  myForm!: FormGroup;
  accion = 'Crear';
  rol?: Rol;
  rol1?: Rol;
  message2: boolean = false;
  element: any;
  nomRol: string = '';

  //vendeData: boolean;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar){
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
        Id_Rol: ['', Validators.required],
        Nom_Rol: ['', [Validators.required, Validators.maxLength(50)]],
        estado: ['', Validators.required],
      });

      const data = this._restService.getRol();
      this.rol1 = data;
      
      // Llama al método get del servicio _restService para traer los datos
      this.route.queryParams.subscribe(params => {
        //this.token = this._restService.getUserToken();
        const acc = params['accion'];
        this.accion = acc;
        //this.vendeData = this._restService.getVendedorData();
        //this.startTokenVerification();
        //valida si esta en el metodo editar para setear los valores en el formulario
        if (this.accion === 'Editar' && this.rol1) {
          // Si es 'Editar', asigna los valores al formulario
          this.myForm.patchValue({
            Id_Rol: this.rol1.Id_Rol,
            Nom_Rol: this.rol1.Nom_Rol,
            estado: this.rol1.estado
          });
        }
      });
    }

    guardarRol(){
      this.rol = {
        Id_Rol: this.myForm.value.Id_Rol,
        Nom_Rol: this.myForm.value.Nom_Rol,
        estado: 1
      }


      if(this.accion == 'Crear'){
        this._restService.post('addRol', this.rol).subscribe(respuesta =>{
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
      this._restService.post('updateRol', this.rol).subscribe(respuesta =>{
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

    listarRol(){
      this.router.navigate(['/ListadoRol']);
    }

    resetCampos(){
      this.myForm.value.Nom_Rol =''
    }
}
