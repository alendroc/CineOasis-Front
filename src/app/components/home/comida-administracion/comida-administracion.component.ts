import { Component } from '@angular/core';
import { Comida } from '../../../models/Comida';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { ComidaService } from '../../../services/comida.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-comida-administracion',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, MatCheckboxModule,MatInputModule, MatTableModule ,MatPaginatorModule, _MatSlideToggleRequiredValidatorModule,MatButtonModule,ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './comida-administracion.component.html',
  styleUrl: './comida-administracion.component.css'
})
export class ComidaAdministracionComponent {

  displayedColumns: string[] = ['select', 'id', 'nombre', 'precio', 'imagen'];
  dataSource = new MatTableDataSource<Comida>([]);
  selection = new SelectionModel<Comida>(true, []);
  comida: Comida = new Comida(0, '', 0, '');
  public _comida: Comida;
  public selectedComida = new Comida(1,"",1,"")

  constructor(private _comidaService: ComidaService) {
    this._comida = new Comida(1,"",0,"")
  }

  ngOnInit(): void {
    // Fetch comidas from the backend
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleAllRows(): void {
    if (this.selection.selected.length === this.dataSource.data.length) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  checkboxLabel(row?: Comida): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isExactlyOneSelected(): boolean {
    return this.selection.selected.length === 1;
  }

  isAtLeastOneSelected(): boolean {
    return this.selection.selected.length > 0;
  }

  storeComida(form:any): void {
    
  }

  deleteSelectedComidas(): void {
    
  }

  prepareUpdateForm(): void {
    
  }

  updateComida(form:any): void {
   
  }

 

}
