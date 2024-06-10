export class Ticket{
    constructor(
        public id:number,
        public idUsuario:number,
        public idFuncion:number,
        public fechaCompra:string,
        public precioTotal:number,
    ){}
}