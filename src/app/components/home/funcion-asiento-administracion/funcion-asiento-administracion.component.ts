import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FuncionAsiento } from '../../../models/FuncionAsiento';
import { SelectionModel } from '@angular/cdk/collections';
import { FuncionAsientoService } from '../../../services/funcionAsiento.service';

@Component({
  selector: 'app-funcion-asiento-administracion',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, MatCheckboxModule,MatInputModule, 
    MatTableModule ,MatPaginatorModule, _MatSlideToggleRequiredValidatorModule,MatButtonModule,ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './funcion-asiento-administracion.component.html',
  styleUrl: './funcion-asiento-administracion.component.css'
})
export class FuncionAsientoAdministracionComponent {
  displayedColumns: string[] = ['select', 'id', 'idFuncion', 'idAsiento', 'estado'];
  dataSource = new MatTableDataSource<FuncionAsiento>([]);
  selection = new SelectionModel<FuncionAsiento>(true, []);
  public selectedFuncionAsiento = new FuncionAsiento(1,0,0,false)
  public _funcionAsiento:FuncionAsiento
  constructor(
    private _funcionAsientoService: FuncionAsientoService,

  ) {
    this._funcionAsiento = new FuncionAsiento(1,0,0,false)
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
  
  checkboxLabel(row?: FuncionAsiento): string {
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


  prepareUpdateForm() {
    if (this.isExactlyOneSelected()) {
      this.selectedFuncionAsiento = { ...this.selection.selected[0] };
    }
  }
}
