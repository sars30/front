export class Rol{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    //lo que hacemos es definirlos de tipo Vendedor
    Id_Rol: number;
    Nom_Rol: string;
    estado: number;

    constructor(Id_Rol: number, Nom_Rol: string, estado: number){

        this.Id_Rol = Id_Rol;
        this.Nom_Rol = Nom_Rol;
        this.estado = estado;
        
    }
}