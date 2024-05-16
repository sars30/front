import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeConfirmacionComponent } from './shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { LoginComponent } from './components/login/login.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { ListLotesComponent } from './components/lotes/list-lotes/list-lotes.component';
import { AddEditLoteComponent } from './components/lotes/add-edit-lote/add-edit-lote.component';
import { AddEditProductoComponent } from './components/productos/add-edit-producto/add-edit-producto.component'; 
import { ListProductosComponent } from './components/productos/list-productos/list-productos.component';
import { AddEditProveedorComponent } from './components/proveedores/add-edit-proveedor/add-edit-proveedor.component';
import { ListProveedorComponent } from './components/proveedores/list-proveedor/list-proveedor.component';
import { AddEditUsuarioComponent } from './components/usuarios/add-edit-usuario/add-edit-usuario.component';
import { ListUsuarioComponent } from './components/usuarios/list-usuario/list-usuario.component';
import { AddEditRolComponent } from './components/roles/add-edit-rol/add-edit-rol.component';
import { ListRolComponent } from './components/roles/list-rol/list-rol.component';

@NgModule({
  declarations: [
    AppComponent,
    MensajeConfirmacionComponent,
    LoginComponent,
    NavbarComponent,
    ListLotesComponent,
    AddEditLoteComponent,
    AddEditProductoComponent,
    ListProductosComponent,
    AddEditProveedorComponent,
    ListProveedorComponent,
    AddEditUsuarioComponent,
    ListUsuarioComponent,
    AddEditRolComponent,
    ListRolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
