import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { UserService } from '../../services/user.service';


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
    constructor(
      private _userService:UserService
    ){
      this.status=-1;
      this.cuerpo='';
      this.user=new User(1,"","","","","",false,"");
    }

//--------------------DIALOG REGISTER------------------------------------------------

    registerUser(form:any){
      this._userService.create(this.user).subscribe({
        next:(response)=>{
          console.log(response);
          if(response.status==201){
            form.reset();            
            this.changeStatus(0);
          }else{
            this.changeStatus(1);
          }
        },
        error:(error:HttpErrorResponse)=>{
          this.changeStatus(2);
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
  

  eleccion(choice:string){
    this.cuerpo = choice
  } 
}

