import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PeticionesService } from 'src/app/services/peticiones.service';
//import { VendedorService } from 'src/app/services/vendedor.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //definimos las variables a usar
  myForm: FormGroup;
  message2: boolean = false;
  ingresar?: {};
  formBuilder: any;
  msj: string = '';
  element: any;
  userData: any;
  menuHabilitado: boolean = true;


  constructor(
    private route: ActivatedRoute, 
    private fb: FormBuilder, 
    private router: Router, 
    private _restService: PeticionesService,
    public dialog: MatDialog){
    //definimos en el contructur un metodo para obtener el token para tener acceso al sistema
    this.route.queryParams.subscribe(params => {
      //se suscribe el token en una constante para que sea estatico y no haga mas solicitudes
      const mensaje = params['mensaje'];
    });
    // Cambia su estilo para ocultarlo
    //this.element.style.display = "none";
    //definimos el form que vamos a enviar a validar al backend con las respectivas restricciones
    this.myForm = this.fb.group({
      Cedula: ['', [Validators.required, Validators.maxLength(11)]],
      contrasena: ['', [Validators.required, Validators.maxLength(20)]]
    });
    
  }

  

  //método que me permite entrar al sistema
  entrar() {
    this.ingresar = {
      Cedula: this.myForm.value.Cedula,
      contrasena: this.myForm.value.contrasena,
    };

    this._restService.post('log', this.ingresar).subscribe({
      next: (respuesta) => {
        console.log(respuesta);
        if (respuesta.codigo === 200) {
          console.log("éxito");
          this.message2 = true;
          this.msj = respuesta.mensaje;
          this.userData = respuesta.usuario;
          this._restService.setNomRol(this.userData.Nom_Rol);
          console.log('Nombre del rol:', this.userData.Nom_Rol);
          if (this.ingresar) {
            this.router.navigate(['/ListadoLotes']);
          }
        } else if (respuesta.codigo === 400) {
          console.log("datos incorrectos");
          const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
            width: '250px',
            data: { mensaje: '¡Contraseña incorrecta!' },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetCampos();
          });

          this.message2 = true;
        } else if (respuesta.codigo === 404) {
          console.log("no encontrado");
          const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
            width: '250px',
            data: { mensaje: '¡Usuario no encontrado!' },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetCampos();
          });

          this.message2 = true;
        } else {
          console.log("error no controlado");
          this.message2 = respuesta.mensaje;
        }
      },
      error: (err) => {
        if (err.status === 400) {
          console.error("Error 400:", err);
          const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
            width: '250px',
            data: { mensaje: 'Datos incorrectos' },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetCampos();
          });
        } else if (err.status === 404) {
          console.error("Error 404:", err);
          const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
            width: '250px',
            data: { mensaje: 'Usuario no encontrado' },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetCampos();
          });
        } else {
          console.error("Error en la solicitud:", err);
          const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
            width: '250px',
            data: { mensaje: 'Error interno del servidor' },
          });

          dialogRef.afterClosed().subscribe(() => {
            this.resetCampos();
          });
        }
      }
    });
  }

  resetCampos(){
    this.myForm.value.Cedula ='',
    this.myForm.value.contrasena =''
  }
}
