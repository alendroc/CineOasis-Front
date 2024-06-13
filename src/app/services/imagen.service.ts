import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Comida } from "../models/Comida";
import { Imagen } from "../models/Imagen";

@Injectable({
    providedIn: 'root'
})

export class ImagenService{
    private urlAPI:string;
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI = server.url;
    }

    //----------------------REST PARA RUTAS GENERALES---------------------------------------------

    uploadImageStore(image: File, path:string): Observable<any> {
        const formData: FormData = new FormData(); 
        formData.append('file', image, image.name);
        const bearerToken = sessionStorage.getItem('token');
        let headers = new HttpHeaders();
        if (bearerToken) {
        headers = headers.set('bearertoken', `${bearerToken}`);
        }
        return this._http.post(this.urlAPI+'imagen/store/'+path, formData, { headers });
    }
    
    updateImage(image: File, path:string, filename: string){
        const formData: FormData = new FormData(); 
        formData.append('file', image, image.name);
        const bearerToken = sessionStorage.getItem('token');
        let headers = new HttpHeaders();
        if (bearerToken) {
        headers = headers.set('bearertoken', `${bearerToken}`);
        }
        return this._http.post(this.urlAPI+`imagen/updateImage/${path}/${filename}`, formData, { headers });
    }
    
    destroyImage(path:string, filename: string){
        const bearerToken = sessionStorage.getItem('token');
        let headers = new HttpHeaders();
        if (bearerToken) {
        headers = headers.set('bearertoken', `${bearerToken}`);
        }
        return this._http.delete(this.urlAPI+`imagen/delete/${path}/${filename}`, { headers });
    }
    
    getImage(path:string, filename: string): Observable<any> {
        const bearerToken = sessionStorage.getItem('token');
        let headers = new HttpHeaders();
        if (bearerToken) {
        headers = headers.set('bearertoken', `${bearerToken}`);
        }
        return this._http.get(`${this.urlAPI}imagen/show/${path}/${filename}`, { headers });
    }


 //----------------------REST PARA PELICULAS---------------------------------------------


 indexImagesForPelicula():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers
    };
    return this._http.get(this.urlAPI+'imagen', options);
}

showImageForPelicula(filename:string):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let options = {
        headers
    };
    return this._http.get(this.urlAPI+`imagen/pelicula/${filename}`, options);
}

createImageForPelicula(imagen:Imagen):Observable<any>{
    let imagenJson=JSON.stringify(imagen);
    let params='data='+imagenJson;
    let headers;
    let bearertoken = sessionStorage.getItem('token');
    if (bearertoken){
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearertoken);
    } else {
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options={
        headers
    }
    return this._http.post(this.urlAPI+'imagen/pelicula',params,options);
}

updateImageForPelicula(imagen:Imagen): Observable<any> {
    let imagenJson=JSON.stringify(imagen);
    let params='data='+imagenJson;
    let headers;
    let bearertoken = sessionStorage.getItem('token');
    if (bearertoken){
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('bearertoken', bearertoken);
    } else {
        headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    }
    let options = {
        headers
    };
    return this._http.put(this.urlAPI+`imagen/pelicula/${imagen.id}`, params, options);
}
 
}