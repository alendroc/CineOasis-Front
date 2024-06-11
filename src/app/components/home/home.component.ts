import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.css',
  providers:[UserService]
})
export class HomeComponent {
  public status:number;
  public cuerpo:string;
  public user:User;
  public errores:string[]=[];
  public identity:any;
  private checkIdentity;
  
    constructor(
      private _userService:UserService,
      private _router: Router,
    ){
      this.status=-1;
      this.cuerpo='';
      this.user=new User(1,"","","","","",false,null);
      this.checkIdentity=setInterval(()=>{
        this.identity=_userService.getIdentityFromStorage()
      },500)
    }

//--------------------DIALOG LOGIN------------------------------------------------
login(form:any){
  this.status=-1;
  this._userService.login(this.user).subscribe({
    next:(response)=>{
      console.log(response);
      if(response.status != 401){
        sessionStorage.setItem("token", response);
        this._userService.getIdentityFromAPI().subscribe({
          next:(resp:any)=>{
            console.log(resp);
            sessionStorage.setItem('identity', JSON.stringify(resp));
            form.reset();
            location.reload();
          },
          error:(error:Error)=>{
            console.log(error);
          }
        })
      } else {
        this.status = 0;
        this.msgAlert('Datos incorrectos','', 'error');
        form.reset(); 
      }
    },
    error:(error:HttpErrorResponse)=>{
      if (error.status === 406 && error.error && error.error.errors) {
        this.errores = [];
        const errorObj = error.error.error;
        for (const key in errorObj) {
          if (errorObj.hasOwnProperty(key)) {
            this.errores.push(...errorObj[key]);
          }
        }
        console.error(this.errores);
      } else {
        console.error('Otro tipo de error:', error);
        this.msgAlert('Error desde el servidor, contacte con un administrador', '', 'error');
      }
      this.changeStatus(2);
      //console.log(error);
    }
  })
}

//------------------------------CERRAR SESION---------------------------------------------------------------
logOut(){
  sessionStorage.clear();
this._router.navigate([''])
}

//--------------------DIALOG REGISTER------------------------------------------------

    registerUser(form:any){
      this._userService.create(this.user).subscribe({
        next:(response)=>{
          console.log(response);
          if(response.status==201){
            form.reset();
            this.msgAlert('Usuario creado con éxito','','success');
            this.changeStatus(0);
          }else{
            this.changeStatus(1);
          }
        },
        error:(error:HttpErrorResponse)=>{
          if (error.status === 406 && error.error && error.error.error) {
            this.errores = [];
            const errorObj = error.error.error;
            for (const key in errorObj) {
              if (errorObj.hasOwnProperty(key)) {
                this.errores.push(...errorObj[key]);
              }
            }
            console.error(this.errores);
          } else {
            console.error('Otro tipo de error:', error);
            this.msgAlert('Error desde el servidor, contacte con un administrador', '', 'error');
          }
          this.changeStatus(2);
          //console.log(error);
        }
      })
    }

    changeStatus(st:number){
      this.status=st;
      let countdown=timer(5000);
      countdown.subscribe(n=>{
        this.status=-1;
      })
    }
  
    //--------------------FUNCIONES DE FECHAS---------------------------------------------------
    dateToString(date: Date): string {
      let ano = date.getFullYear();
      let mes = ('0' + (date.getMonth() + 1)).slice(-2); // Mes se cuenta desde 0
      let dia = ('0' + date.getDate()).slice(-2);
      return `${ano}-${mes}-${dia}`;
    }
  
    public formatDate(event:Event): string {
      const input = event.target as HTMLInputElement;
      const fecha = new Date(input.value);
      let ano = fecha.getFullYear();
      let mes = ('0' + (fecha.getMonth() + 1)).slice(-2); // Mes se cuenta desde 0
      let dia = ('0' + fecha.getDate()).slice(-2);
      return `${ano}-${mes}-${dia}`;
    }


//--------------------------FUNCIONES DE ALERTAS-------------------------------------------------------------------
msgAlert= (title:any, text:any, icon:any) =>{
  Swal.fire({
    title,
    text,
    icon,
  })
}



  eleccion(choice:string){
    this.cuerpo = choice
  } 
}