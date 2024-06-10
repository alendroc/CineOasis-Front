export class DetallesCombo{
    constructor(
        public id:number,
        public idTicket:number,
        public idComida:number,
        public cantidad:number,
        public subtotal:number,
        public descuento:number,
        public impuesto:number
    ){}
}