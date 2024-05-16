import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.css']
})
export class ListRolComponent {
  accion = 'Crear';
  element: any;
  message2: boolean = true;
  ok: boolean = false;
  nomRol: string = '';
  displayedColumns: string[] = ['Id_Rol', 'Nom_Rol','estado', 'acciones'];	
  dataSource: MatTableDataSource<Rol> = new MatTableDataSource<Rol>([]); 

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    public snackBar: MatSnackBar,
    private _restService: PeticionesService){
      this.element = document.getElementById("menu_xd");
      // Cambia su estilo para mostrarlo
      this.element.style.display = "flex";
    }

  ngOnInit() {
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
    this.getRol(); // Llama a getLotes() cuando se inicializa el componente
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getRol(): void {
    this._restService.getData('seeRol').subscribe(response => {
      if (response && response.mensaje && Array.isArray(response.mensaje)) {
        const roles = response.mensaje; // Acceder al arreglo de lotes
        this.dataSource = new MatTableDataSource<Rol>(roles);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error('Los datos recibidos no son un arreglo válido:', response);
        this.dataSource = new MatTableDataSource<Rol>([]); // Asignar un arreglo vacío
      }
    });
  }

  // Filtro de la tabla, permite hacer búsquedas rápidas
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  irAEditarDatos(rol: Rol) {
    const data = rol;
    this._restService.setRol(data); // Establece los datos en el servicio
    this.router.navigate(['/addRol'], { queryParams: { accion: 'Editar' } });
  }

  irACrearDatos(){
    this.router.navigate(['/addRol'], { queryParams: { accion: 'Crear'} });
  }

  irAEditarEstado(Id_Rol: string): void {
    const url = 'estadoRol'; // URL de la API
    const data = { Id_Rol: Id_Rol, estado: null }; // Construye el objeto con el Cod_Lote y un estado nulo
  
    // Llama al método post del servicio _restService
    this._restService.post(url, data).subscribe(
      respuesta => {
        if (respuesta.codigo === 200) {
          console.log("Éxito");
          this.snackBar.open('Estado del rol modificado con éxito', '', {
            duration: 5000
          });
          this.getRol();
          this.message2 = true;
          this.ok = true;
        } else if (respuesta.codigo === 400) {
          console.log("Datos incorrectos");
          this.snackBar.open('Algo salió mal!', '', {
            duration: 3000
          });
          this.message2 = false;
          this.ok = false;
        } else if (respuesta.codigo === 404) {
          console.log("No encontrado");
          this.snackBar.open('Algo salió mal!', '', {
            duration: 3000
          });
          this.message2 = false;
          this.ok = false;
        } else {
          console.log("Error no controlado");
          this.snackBar.open('Algo salió mal!', '', {
            duration: 3000
          });
          this.message2 = false;
          this.ok = false;
        }
      },
      error => {
        console.error('Error al llamar al endpoint:', error);
        this.snackBar.open('Error al conectar con el servidor', '', {
          duration: 3000
        });
        this.message2 = false;
        this.ok = false;
      }
    );
  }

}
