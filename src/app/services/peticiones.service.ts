import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  private urlApi = environment.api;
  private lote: any;
  private prove: any;
  private prod: any;
  private usu: any;
  private rol: any;
  private nom: any;
  

  constructor(private http: HttpClient) { }

  public post(url: string, data: any){
    return this.http.post<any>(this.urlApi + url, data)
  }

  //creamos un método get para lisar el vendedor
  /*public getVendedores(url: string, token: string){
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + token });
    const requestOptions = { headers: headers };
    return this.http.get<any>(this.urlApi + url, requestOptions);
  }*/
  public getData(url: string){
    return this.http.get<any>(this.urlApi + url)
  }

  setLote(lote: any) {
    this.lote = lote;
  }

  setNomRol(nom: string){
    this.nom = nom;
  }

  getNomRol(){
    return this.nom;
  }

  getLote() {
    return this.lote;
  }

  setProveedor(prove: any) {
    this.prove = prove;
  }

  getProveedor() {
    return this.prove;
  }

  setProducto(prod: any) {
    this.prod = prod;
  }

  getProducto() {
    return this.prod;
  }

  setUsuario(usu: any) {
    this.usu = usu;
  }

  getUsuario() {
    return this.usu;
  }

  setRol(rol: any) {
    this.rol = rol;
  }

  getRol() {
    return this.rol;
  }

}
