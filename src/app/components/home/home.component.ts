import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.css'
})
export class HomeComponent {
  cuerpo: string = '';
  

  eleccion(choice:string){
    this.cuerpo = choice
  } 
}

