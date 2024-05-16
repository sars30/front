export class Proveedor{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    Id_Proveedor: number;
    nombre: string;
    estado: number;
    telefono: number;

    constructor(Id_Proveedor: number, nombre: string, estado: number, telefono: number){
        
        this.Id_Proveedor = Id_Proveedor, 
        this.nombre = nombre,
        this.estado = estado,
        this.telefono = telefono
        
    }
}