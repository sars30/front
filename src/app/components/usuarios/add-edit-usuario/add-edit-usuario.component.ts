import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-add-edit-usuario',
  templateUrl: './add-edit-usuario.component.html',
  styleUrls: ['./add-edit-usuario.component.css']
})
export class AddEditUsuarioComponent {
  myForm!: FormGroup;
  accion = 'Crear';
  roles: Rol[] = [];
  usuario?: Usuario;
  usuario1?: Usuario;
  estado = 1;
  message2: boolean = false;
  id_rol: number = 0;
  nom_rol: string = '';
  element: any;
  nomRol: string = '';

  //vendeData: boolean;
  constructor(private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar){
      this._restService.getData('seeRol').subscribe(
        (response: any) => {
          // Verifica que la respuesta tenga la propiedad "mensaje" y que "mensaje" sea un array
          if (response && response.mensaje && Array.isArray(response.mensaje)) {
            // Asigna los proveedores obtenidos del servicio a la variable local
            this.roles = response.mensaje;
            this.roles.forEach(rol => {
              console.log(rol.Id_Rol);
              this.id_rol = rol.Id_Rol;
              this.nom_rol = rol.Nom_Rol;
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
        Cedula: ['', [Validators.required, Validators.maxLength(11)]],
        nombre: ['', [Validators.required, Validators.maxLength(200)]],
        apellido: ['', [Validators.required, Validators.maxLength(200)]],
        direccion: ['', [Validators.required, Validators.maxLength(100)]],
        correo: ['', [Validators.required, Validators.maxLength(200)]],
        fecha_nac: ['', [Validators.required, Validators.maxLength(200)]],
        contrasena: ['', [Validators.required, Validators.maxLength(200)]],
        Id_Rol: [0, [Validators.required]]
      });

      const data = this._restService.getUsuario();
      this.usuario1 = data;
      
      // Llama al método get del servicio _restService para traer los datos
      this.route.queryParams.subscribe(params => {
        //this.token = this._restService.getUserToken();
        const acc = params['accion'];
        this.accion = acc;
        //this.vendeData = this._restService.getVendedorData();
        //this.startTokenVerification();
        //valida si esta en el metodo editar para setear los valores en el formulario
        if (this.accion === 'Editar' && this.usuario1) {
          // Si es 'Editar', asigna los valores al formulario
          this.myForm.patchValue({
            Cedula: this.usuario1.Cedula,
            nombre: this.usuario1.nombre,
            apellido: this.usuario1.apellido,
            direccion: this.usuario1.direccion,
            correo: this.usuario1.correo,
            fecha_nac: this.usuario1.fecha_nac,
            contrasena: this.usuario1.contrasena,
            estado: this.usuario1.estado
          });
        }
      });
    }

    guardarUsuario(){
      this.usuario = {
        Cedula: this.myForm.value.Cedula,
        nombre: this.myForm.value.nombre,
        apellido: this.myForm.value.apellido,
        direccion: this.myForm.value.direccion,
        correo: this.myForm.value.correo,
        fecha_nac: this.myForm.value.fecha_nac,
        contrasena: this.myForm.value.contrasena,
        Id_Rol: this.myForm.value.Id_Rol,
        estado: this.estado
      };

      if(this.accion == 'Crear'){
        this._restService.post('addUsuario', this.usuario).subscribe(respuesta =>{
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
        this._restService.post('updateUsuario', this.usuario).subscribe(respuesta =>{
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

    listarUsuario(){
      this.router.navigate(['/ListadoUsuarios']);
    }
}
