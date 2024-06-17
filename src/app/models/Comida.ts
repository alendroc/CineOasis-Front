export class Comida{
    originalImagen: any;
    constructor(
        public id:number,
        public nombre:string,
        public precio:number,
        public imagen:string
    ){}
}