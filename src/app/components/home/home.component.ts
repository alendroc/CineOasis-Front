import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 

  
}

