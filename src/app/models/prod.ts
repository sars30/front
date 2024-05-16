export class Prod{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    //lo que hacemos es definirlos de tipo Vendedor
    Nombre: string;
    Descripcion: string;
    estado: number;
    Cedula: number;

    constructor(
        Nombre: string,
        Descripcion: string,
        estado: number,
        Cedula: number){

            this.Nombre = Nombre,
            this.Descripcion = Descripcion,
            this.estado = estado,
            this.Cedula = Cedula
        
    }
}