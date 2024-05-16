export class lote{
    //atributos del vendedor; con el fin de no definir en cada clase los array que guardan los datos de vendedor
    //lo que hacemos es definirlos de tipo Vendedor
    Cod_Lote: string;
    Fecha_ingreso: Date;
    Fecha_venc: Date;
    Fecha_fabri: Date;
    Unidades: number;
    Descripcion: string;
    estado: number;
    Id_Producto?: number;
    Id_Proveedor: number;

    constructor(Cod_Lote: string,
        Fecha_ingreso: Date,
        Fecha_venc: Date,
        Fecha_fabri: Date,
        Unidades: number,
        Descripcion: string,
        estado: number,
        Id_Producto: number,
        Id_Proveedor: number){

        this.Cod_Lote = Cod_Lote;
        this.Fecha_ingreso = Fecha_ingreso;
        this.Fecha_venc = Fecha_venc;
        this.Fecha_fabri = Fecha_fabri;
        this.Unidades = Unidades;
        this.Descripcion = Descripcion;
        this.estado = estado;
        this.Id_Producto = Id_Producto;
        this.Id_Proveedor = Id_Proveedor;
    
    }
}