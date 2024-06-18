import { Component } from '@angular/core';
import { Funcion } from '../../../models/Funcion';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { SelectionModel } from '@angular/cdk/collections';
import { FuncionService } from '../../../services/funcion.service';
import { PeliculaService } from '../../../services/pelicula.service';
import { Pelicula } from '../../../models/Pelicula';

@Component({
  selector: 'app-funcion-administracion',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, MatCheckboxModule,MatInputModule, 
    MatTableModule ,MatPaginatorModule, _MatSlideToggleRequiredValidatorModule,MatButtonModule,ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './funcion-administracion.component.html',
  styleUrl: './funcion-administracion.component.css'
})
export class FuncionAdministracionComponent {
  displayedColumns: string[] = ['select', 'id', 'idPelicula', 'sala', 'fecha', 'horaInicio', 'horaFinal','precio'];
  dataSource = new MatTableDataSource<Funcion>([]);
  selection = new SelectionModel<Funcion>(true, []);
  public selectedFuncion = new Funcion(1,0,"","","","",0)
  salas=['A','B','C','D','E'];
  public _funcion:Funcion
  public peliculas: Pelicula[] = [];
  public _pelicula:Pelicula
  peliculasList: { key: number, value: string }[] = [];
  constructor(
    private _funcionService: FuncionService,
    private _peliculaService: PeliculaService
  ) {
    this._funcion = new Funcion(1,0,"","","","",0)
    this._pelicula = new Pelicula(1,"","","","","","","","","","","")
    //this.urlAPI = server.url+'imagen/show/comidas/';
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
  
  checkboxLabel(row?: Funcion): string {
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

/*****************************CREACIÓN DE LAS FUNCIONES PRINCIPALES DEL CRUD*****************************/
  
  ngOnInit():void {
    this.getFunciones();
  }

/*****************************  GET  *****************************/
  getFunciones() {
    this._funcionService.index().subscribe({
    next: (response: any) => {
    console.log("entro")
      this.dataSource.data= response['data'];
      console.log(this.dataSource.data)
      console.log(response)
      this.dataSource.data.forEach(e => {
        this.loadPeliculaName(e.idPelicula);
      });
    },
      error: (err: Error) => {
        console.error('Error al cargar las funciones', err);
      }
    });
  }

   /*****************************  CREATE  *****************************/
   storeFuncion(form: any): void {
    if (form.valid) {
      console.log(this._funcion)
      this._funcionService.create(this._funcion).subscribe({
      next:(response)=>{
        console.log(response);
        this.getFunciones();
        if(response.status==201){
          form.reset();            
            } else {
              console.error('No se pudo ingrear la funcion');
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        });
    }
  }

  /*****************************  DELETE  *****************************/
  deleteSelectedFunciones() {
    this.selection.selected.forEach(user => {
      this._funcionService.delete(user.id).subscribe({
        next: () => {
          // (image!=null)? this.deleteUserImage(image!):console.log('No hay imagenes');
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
          this.selection.clear();
        },
        error: (err: any) => {
          console.error('Error al eliminar la funcion', err);
        }
      });
    });
  }


  /*****************************  UPDATE  *****************************/
    updateFuncion(form: any): void {
      if (form.valid) {
        this._funcionService.update(this.selectedFuncion).subscribe({
          next: (updatedFuncion) => {
            const index = this.dataSource.data.findIndex(user => user.id === updatedFuncion.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedFuncion;
              this.dataSource.data = [...this.dataSource.data]; // Para disparar la actualización de Angular
              
            }
            form.reset();
            this.getFunciones();
            this.selection.clear(); 
          },
          error: (err) => {
            console.error('Error al actualizar la funcion', err);
          }
        });
      }
    }
    
    prepareUpdateForm() {
      if (this.isExactlyOneSelected()) {
        this.selectedFuncion = { ...this.selection.selected[0] };
      }
    }

    /*****************************  Obtener nombre  *****************************/
    loadPeliculaName(id: number) {
      const peliculaExistente = this.peliculasList.find(p => p.key === id);
      if (!peliculaExistente) {
        this._peliculaService.show(id).subscribe({
          next: (response: any) => {
            let pelicula = response['pelicula'];
            if (!this.peliculasList.some(p => p.key === pelicula.id)) {
              this.peliculasList.push({
                key: pelicula.id,
                value: pelicula.nombre
              });
            }
          },
          error: (err: Error) => {
            console.error('Error al buscar la pelicula', err);
          }
        });
      }
    }
  
    getPeliculaNameById(id: number): string {
      const pelicula = this.peliculasList.find(p => p.key === id);
      return pelicula ? pelicula.value : 'Desconocido';
    }
  


}

