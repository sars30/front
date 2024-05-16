export class Producto{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    //lo que hacemos es definirlos de tipo Vendedor
    Id_Producto?: number;
    Nombre: string;
    Descripcion: string;
    estado: number;
    Cedula: number;

    constructor(Id_Producto: number,
        Nombre: string,
        Descripcion: string,
        estado: number,
        Cedula: number){

            this.Id_Producto = Id_Producto,
            this.Nombre = Nombre,
            this.Descripcion = Descripcion,
            this.estado = estado,
            this.Cedula = Cedula
        
    }
}