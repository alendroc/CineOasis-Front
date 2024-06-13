import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { server } from "./global";
import { BehaviorSubject, Observable, map, tap } from "rxjs";
import { User } from "../models/User";

@Injectable({
    providedIn: 'root'
})

export class UserService{
    private urlAPI:string;
    private userSubject = new BehaviorSubject<any>(null);
    public user$ = this.userSubject.asObservable();
    constructor(
        private _http:HttpClient
    ){
        this.urlAPI = server.url;
    }

    //----------------------Identity---------------------------------------------

    getIdentityFromAPI():Observable<any>{
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

        return this._http.get(this.urlAPI+'user/getIdentity', options);
    }

    getIdentityFromStorage(){
        let identity=sessionStorage.getItem('identity')
        if(identity){
            
            return JSON.parse(identity)
        }
        return null
    }

    //----------------------REST---------------------------------------------

    index():Observable<any>{
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
        return this._http.get(this.urlAPI+'user', options);
    }

    index2(): Observable<User[]> {
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
        return this._http.get<any>(this.urlAPI + 'user', options).pipe(
            map(response => response.data)
        );
    }

    show(id:number):Observable<any>{
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
        return this._http.get(this.urlAPI+`user/${id}`, options);
    }

    create(user:User):Observable<any>{
        let userJson=JSON.stringify(user);
        let params='data='+userJson;
        let headers=new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
        let options={
            headers
        }
        return this._http.post(this.urlAPI+'user',params,options);
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
        return this._http.delete(this.urlAPI+`user/${id}`, options);
    }

    update(user:User): Observable<any> {
        let userJson=JSON.stringify(user);
        let params='data='+userJson;
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
        return this._http.put(this.urlAPI+`user/${user.id}`, params, options);
    }

    update2(user: User): Observable<any> {
        const userJson = JSON.stringify(user);
        const params = `data=${userJson}`;
        const headersConfig: { [header: string]: string | string[] } = {
            'Content-Type': 'application/x-www-form-urlencoded'
        };
    
        const bearertoken = sessionStorage.getItem('token');
        if (bearertoken) {
            headersConfig['Authorization'] = `Bearer ${bearertoken}`;
        }
    
        const headers = new HttpHeaders(headersConfig);
        const url = `${this.urlAPI}user/${user.id}`;
    
        return this._http.put(url, params, { headers });
    }
    

 //----------------------Login---------------------------------------------

    login(user:User):Observable<any>{
        let userJson = JSON.stringify(user);
        let params = 'data='+userJson;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        let options = {
            headers
        };
        return this._http.post(this.urlAPI+'user/login', params, options);
    }

 
 
}