import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { Producto } from 'src/app/models/producto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-productos',
  templateUrl: './list-productos.component.html',
  styleUrls: ['./list-productos.component.css']
})
export class ListProductosComponent {
  accion = 'Crear';
  element: any;
  message2: boolean = true;
  ok: boolean = false;
  nomRol: string = '';
  displayedColumns: string[] = ['Id_Producto', 'Nombre', 'Descripcion',	'estado',	'Cedula', 'acciones'];	
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>([]); 

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
    this.getProductos(); // Llama a getLotes() cuando se inicializa el componente
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  getProductos(): void {
    this._restService.getData('seeProducto').subscribe(response => {
      if (response && response.mensaje && Array.isArray(response.mensaje)) {
        const productos = response.mensaje; // Acceder al arreglo de lotes
        this.dataSource = new MatTableDataSource<Producto>(productos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        console.error('Los datos recibidos no son un arreglo válido:', response);
        this.dataSource = new MatTableDataSource<Producto>([]); // Asignar un arreglo vacío
      }
    });
  }

  // Filtro de la tabla, permite hacer búsquedas rápidas
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  irAEditarDatos(producto: Producto) {
    const data = producto;
    this._restService.setProducto(data); // Establece los datos en el servicio
    this.router.navigate(['/addProducto'], { queryParams: { accion: 'Editar' } });
  }

  irACrearDatos(){
    this.router.navigate(['/addProducto'], { queryParams: { accion: 'Crear'} });
  }

  irAEditarEstado(Id_Producto: string): void {
    const url = 'estadoProducto'; // URL de la API
    const data = { Id_Producto: Id_Producto, estado: null }; // Construye el objeto con el Cod_Lote y un estado nulo
  
    // Llama al método post del servicio _restService
    this._restService.post(url, data).subscribe(
      respuesta => {
        if (respuesta.codigo === 200) {
          console.log("Éxito");
          this.snackBar.open('Estado del lote modificado con éxito', '', {
            duration: 5000
          });
          this.getProductos();
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
