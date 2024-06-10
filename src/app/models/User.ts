export class User{
    constructor(
        public id:number,
        public nombre:string,
        public apellido:string,
        public email:string,
        public password:string,
        public fechaNacimiento:string,
        public permisoAdmin:boolean,
        public imagen:string | null
    ){}
}