import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Asiento } from "../models/Asiento";

@Injectable({
    providedIn: 'root'
})

export class AsientoService{
    private urlAPI:string;
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI = server.url;
    }

    //----------------------REST---------------------------------------------

    index():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers
        };
        return this._http.get(this.urlAPI+'asiento', options);
    }

    show(id:number):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers
        };
        return this._http.get(this.urlAPI+`asiento/${id}`, options);
    }

    create(asiento:Asiento):Observable<any>{
        let asientoJson=JSON.stringify(asiento);
        let params='data='+asientoJson;
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
        return this._http.post(this.urlAPI+'asiento',params,options);
    }


    delete(id:number):Observable<any>{
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
        return this._http.delete(this.urlAPI+`asiento/${id}`, options);
    }

    update(asiento:Asiento): Observable<any> {
        let asientoJson=JSON.stringify(asiento);
        let params='data='+asientoJson;
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
        return this._http.put(this.urlAPI+`asiento/${asiento.id}`, params, options);
    }


 //----------------------RELLENAR ASIENTO (CREAR SEGUN UNA CANTIDAD DIGITADA)---------------------------------------------
 
 rellenar(asiento:Asiento):Observable<any>{
    let asientoJson=JSON.stringify(asiento);
    let params='data='+asientoJson;
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
    return this._http.post(this.urlAPI+'asiento/rellenar',params,options);
}
 
}