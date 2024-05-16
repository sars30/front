export class Usuario{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    //lo que hacemos es definirlos de tipo Vendedor
    Cedula: number;
    nombre: string;
    apellido: string;
    direccion: string;
    correo: string;
    fecha_nac: Date;
    contrasena: string;
    Id_Rol: number;
    estado: number;

    constructor(Cedula: number,
        nombre: string,
        apellido: string,
        direccion: string,
        correo: string,
        fecha_nac: Date,
        contrasena: string,
        Id_Rol: number,
        estado: number){

        this.Cedula = Cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.correo = correo;
        this.fecha_nac = fecha_nac;
        this.contrasena = contrasena 
        this.Id_Rol = Id_Rol;
        this.estado = estado;    
    }
}