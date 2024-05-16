import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ListLotesComponent } from './components/lotes/list-lotes/list-lotes.component';
import { AddEditLoteComponent } from './components/lotes/add-edit-lote/add-edit-lote.component';
import { AddEditProductoComponent } from './components/productos/add-edit-producto/add-edit-producto.component';
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { AddEditProveedorComponent } from './components/proveedores/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/proveedores/list-proveedor/list-proveedor.component';
import { ListUsuarioComponent } from './components/usuarios/list-usuario/list-usuario.component';
import { AddEditUsuarioComponent } from './components/usuarios/add-edit-usuario/add-edit-usuario.component';
import { ListRolComponent } from './components/roles/list-rol/list-rol.component';
import { AddEditRolComponent } from './components/roles/add-edit-rol/add-edit-rol.component';

const routes: Routes = [
  //Definimos las rutas a las que nos podemos mover
  { path: 'login', component: LoginComponent },
  { path: 'ListadoLotes', component: ListLotesComponent },
  { path: 'addLote', component: AddEditLoteComponent },
  { path: 'ListadoProductos', component: ListProductosComponent },
  { path: 'addProducto', component: AddEditProductoComponent },
  { path: 'ListadoProveedores', component: ListProveedorComponent },
  { path: 'addProveedor', component: AddEditProveedorComponent },
  { path: 'ListadoUsuarios', component: ListUsuarioComponent },
  { path: 'addUsuario', component: AddEditUsuarioComponent },
  { path: 'ListadoRol', component: ListRolComponent },
  { path: 'addRol', component: AddEditRolComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
