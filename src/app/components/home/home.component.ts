import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Subscription } from 'rxjs';



/** Constants used to fill up our data base. */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, MatInputModule, MatTableModule ,MatPaginatorModule],
  templateUrl:'./home.component.html',
  styleUrl:'./home.component.css'
})
  export class HomeComponent { 
  
  
}