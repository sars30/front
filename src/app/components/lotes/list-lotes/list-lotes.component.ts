import { Component, ViewChild, AfterViewInit, OnInit, Renderer2, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { lote } from 'src/app/models/lote';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-list-lotes',
  templateUrl: './list-lotes.component.html',
  styleUrls: ['./list-lotes.component.css']
})
export class ListLotesComponent implements AfterViewInit, OnInit {
  accion = 'Crear';
  element: any;
  message2: boolean = true;
  ok: boolean = false;
  nomRol: string = '';
  displayedColumns: string[] = ['Alerta', 'Cod_Lote', 'Fecha_ingreso', 'Fecha_venc', 'Fecha_fabri', 'Unidades', 'Descripcion', 'estado', 'Id_Producto', 'Id_Proveedor', 'acciones'];
  dataSource = new MatTableDataSource<lote>([]); // Inicializar como una instancia vacía de MatTableDataSource

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _restService: PeticionesService,
    public snackBar: MatSnackBar,
    private dialog: MatDialog) {}

  ngOnInit() {
    this.nomRol = this._restService.getNomRol();
    console.log(this.nomRol)
    
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
    this.getLotes(); // Llama a getLotes() cuando se inicializa el componente
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

 // Trae los datos de los vendedores
 getLotes(): void {
  this._restService.getData('seeLote').subscribe(response => {
    if (response && response.mensaje && Array.isArray(response.mensaje)) {
      const lotes = response.mensaje; // Acceder al arreglo de lotes

      // Ordenar los lotes por prioridad: warning > schedule > ninguno
      lotes.sort((a: lote, b: lote) => {
        const aVencido = this.isVencido(a);
        const aProximo = this.isProximoVencimiento(a);
        const bVencido = this.isVencido(b);
        const bProximo = this.isProximoVencimiento(b);

        if (aVencido && !bVencido) return -1;
        if (!aVencido && bVencido) return 1;
        if (aProximo && !bProximo) return -1;
        if (!aProximo && bProximo) return 1;
        return 0;
      });

      this.dataSource = new MatTableDataSource<lote>(lotes);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      console.error('Los datos recibidos no son un arreglo válido:', response);
      this.dataSource = new MatTableDataSource<lote>([]); // Asignar un arreglo vacío
    }
  });
}

  
  
  // Filtro de la tabla, permite hacer búsquedas rápidas
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isVencido(lote: lote): boolean {
    const fechaVencimientoDate = new Date(lote.Fecha_venc);
    const hoy = new Date();
    return fechaVencimientoDate < hoy; // Retorna true si la fecha de vencimiento es anterior a hoy
  }
  
  isProximoVencimiento(lote: lote): boolean {
    const fechaVencimientoDate = new Date(lote.Fecha_venc);
    const hoy = new Date();
    const diferenciaDias = Math.ceil((fechaVencimientoDate.getTime() - hoy.getTime()) / (1000 * 3600 * 24));
    return diferenciaDias <= 15 && diferenciaDias >= 0; // Retorna true si faltan 15 días o menos para la fecha de vencimiento
  }

  vencido(){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '250px',
      data: {mensaje: '¡ESTE LOTE YA SE VENCIÓ, RETIRELO DEL INVENTARIO, NO LO VENDA!' },
    });
    
    dialogRef.afterClosed().subscribe(() => { // Eliminar el parámetro 'result'
      this.getLotes();
    });
  }

  alerta(){
    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '250px',
      data: {mensaje: '¡ESTE LOTE SE VENCERÁ EN 15 DÍAS, DEBE VENDERLO LO MAS PRONTO POSIBLE PARA EVITAR SU PERDIDA!' },
    });
    
    dialogRef.afterClosed().subscribe(() => { // Eliminar el parámetro 'result'
      this.getLotes();
    });
  }  
  
  irAEditarDatos(lote: lote) {
    const data = lote;
    this._restService.setLote(data); // Establece los datos en el servicio
    this.router.navigate(['/addLote'], { queryParams: { accion: 'Editar' } });
  }

  irACrearDatos() {
    this.router.navigate(['/addLote'], { queryParams: { accion: 'Crear' } });
  }

  irAEditarEstado(Cod_Lote: string): void {
    const url = 'estadoLote'; // URL de la API
    const data = { Cod_Lote: Cod_Lote, estado: null }; // Construye el objeto con el Cod_Lote y un estado nulo
  
    // Llama al método post del servicio _restService
    this._restService.post(url, data).subscribe(
      respuesta => {
        if (respuesta.codigo === 200) {
          console.log("Éxito");
          this.snackBar.open('Estado del lote modificado con éxito', '', {
            duration: 5000
          });
          this.getLotes();
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
