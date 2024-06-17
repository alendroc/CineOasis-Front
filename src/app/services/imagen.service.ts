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
    
    updateImage(image: File, path:string, filename: string):Observable<any>{
        const formData: FormData = new FormData(); 
        formData.append('file', image, image.name);
        const bearerToken = sessionStorage.getItem('token');
        let headers = new HttpHeaders();
        if (bearerToken) {
        headers = headers.set('bearertoken', `${bearerToken}`);
        }
        return this._http.post(this.urlAPI+'imagen/update/'+path+'/'+filename, formData, { headers });
    }
    
    destroyImage(path:string, filename: string):Observable<any>{
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
        return this._http.get(`${this.urlAPI}imagen/show/${path}/${filename}`, { headers, responseType: 'blob' });
    }

    searchImage(path:string, filename: string): Observable<any> {
        let headers = new HttpHeaders();
        return this._http.get(`${this.urlAPI}imagen/search/${path}/${filename}`, { headers, responseType: 'blob' });
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

createImageForPelicula(formData: FormData): Observable<any> {
    let headers = new HttpHeaders();
    const bearertoken = sessionStorage.getItem('token');
    if (bearertoken) {
      headers = headers.set('bearertoken', bearertoken);
    }

    return this._http.post(this.urlAPI + 'imagen/pelicula', formData, { headers });
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
 

destroyImagePelicula(id: number): Observable<any> {
    const bearertoken = sessionStorage.getItem('token');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    if (bearertoken) {
      headers = headers.set('Authorization', `Bearer ${bearertoken}`);
    }

    const options = {
      headers: headers
    };

    // Asumiendo que el endpoint para eliminar imágenes acepta DELETE requests
    return this._http.delete(`${this.urlAPI}imagen/pelicula/${id}`, options);
  }
}