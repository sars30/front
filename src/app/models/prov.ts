export class prov{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    nombre: string;
    estado: number;
    telefono: number;

    constructor(nombre: string, estado: number, telefono: number){
        
        this.nombre = nombre,
        this.estado = estado,
        this.telefono = telefono
        
    }
}