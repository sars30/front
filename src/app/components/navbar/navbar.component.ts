import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router){}  
    
  irAEditarLote(){
    this.router.navigate(['/LiastadoLote'], { queryParams: { accion: 'Editar'} });
  }

  irACrearLote(){
    this.router.navigate(['/ListadoLotes'], { queryParams: { accion: 'Crear'} });
  }

  irACrearProducto(){
    this.router.navigate(['/ListadoProductos'], { queryParams: { accion: 'Crear'} });
  }

  irACrearProveedor(){
    this.router.navigate(['/ListadoProveedores'], { queryParams: { accion: 'Crear'} });
  }

  irACrearUsuario(){
    this.router.navigate(['/ListadoUsuarios'], { queryParams: { accion: 'Crear'} });
  }

  irACrearRol(){
    this.router.navigate(['/ListadoRol'], { queryParams: { accion: 'Crear'} });
  }
  
  cerrarSesion(){
    console.log("exito")
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '250px',
      data: {mensaje: '¿Desea cerrar sesión?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/Login']);
    });
  }
}
