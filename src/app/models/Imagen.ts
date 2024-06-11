export class Imagen{
    constructor(
        public id:number,
        public idPelicula:number,
        public imagen:string | null,
        public descripcion:string
    ){}
}