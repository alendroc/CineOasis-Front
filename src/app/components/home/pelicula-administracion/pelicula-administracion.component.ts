import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ImagenService } from '../../../services/imagen.service';
import { Pelicula } from '../../../models/Pelicula';
import { PeliculaService } from '../../../services/pelicula.service';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-pelicula-administracion',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatOptionModule,],
  templateUrl: './pelicula-administracion.component.html',
  styleUrl: './pelicula-administracion.component.css'
})
export class PeliculaAdministracionComponent {
  displayedColumns: string[] = ['select', 'id', 'nombre', 'descripcion', 'duracion', 'idioma', 'subtitulo',
    'genero','fechaEstreno','calificacionEdad','animacion','director','elenco'];
  dataSource = new MatTableDataSource<Pelicula>([]);
  selection = new SelectionModel<Pelicula>(true, []);

  idiomas: string[] = ['Español','Ingles','Frances','Portugues','Japones'];
  subtitulos: string[] = ['Español','Ingles','Frances','Portugues','Japones','No Posee'];
  animaciones: string[] = [ '2D','3D','Stop-Motion'];
  generos: string[] = ['Acción', 'Aventura', 'Comedia', 'Drama', 'Terror', 'Ciencia ficción', 'Fantasía', 
    'Animación', 'Romance', 'Suspenso'];



  clasificaciones = [
    { key: 'G', value: 'Para todos los públicos' },
    { key: 'PG', value: 'Con supervisión de los padres' },
    { key: 'PG-13', value: 'Con supervisión de los padres para menores de 13 años' },
    { key: 'R', value: 'Restringido y con supervisión de los padres para menores de 17 años' },
    { key: 'NC-17', value: 'Para mayores de 17 años' }
  ];

  
  public _pelicula: Pelicula;
  peliculas: Pelicula[] = [];
  public selectedPelicula: Pelicula = new Pelicula(1,'','','','','','','','','','','');

  constructor(
    private _peliculaService: PeliculaService,
    private _imagenService:ImagenService,
  ) {
    this._pelicula= new Pelicula(1,'','','','','','','','','','','');
  }


  //-------------FUNCION QUE LIMPIA FORM----------------
  resetForm(form:any){form.reset();}

  /****************ESTAS SON FUNCIONES PROPIAS DE LA TABLA PARA EL CHECKBOX Y SELECIONAR****************/
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Pelicula): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAtLeastOneSelected(): boolean {
    return !this.selection.isEmpty();
  }

  isExactlyOneSelected(): boolean {
    return this.selection.selected.length === 1;
  }

  /*****************************CREACIÓN DE LAS FUNCIONES PRINCIPALES DEL CRUD*****************************/
  
  ngOnInit():void {
    this.getPeliculas();
  }

  /*****************************  GET  *****************************/
  getPeliculas() {
    this._peliculaService.index().subscribe({
      next: (response: any) => {
        this.dataSource.data = response['data'];
        console.log();
      },
      error: (err: Error) => {
        console.error('Error al cargar las peliculas', err);
      }
    });
  }

  /*****************************  CREATE  *****************************/
  storePelicula(form: any): void {
    if (form.valid) {
      this._peliculaService.create(this._pelicula).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status==201){
          form.reset();   
          this.getPeliculas();        
            } else {
              console.error('No se pudo ingrear la pelicula');
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        });
    }
  }

  /*****************************  DELETE  *****************************/
  deleteSelectedPeliculas() {
    this.selection.selected.forEach(pelicula => {
      this._peliculaService.delete(pelicula.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== pelicula.id);
          this.selection.clear();
          this.getPeliculas();   
        },
        error: (err: any) => {
          console.error('Error al eliminar la pelicula', err);
        }
      });
    });
  }


  /*****************************  UPDATE  *****************************/
    updatePelicula(form: any): void {
      // console.log('funcion')
      // if (form.valid) {
      //console.log('nueva duracion',this.selectedPelicula.duracion);
      this.selectedPelicula.duracion=this.formatTime(this.selectedPelicula.duracion);

        this._peliculaService.update(this.selectedPelicula).subscribe({
          next: (updatedPelicula) => {
            const index = this.dataSource.data.findIndex(pelicula => pelicula.id === updatedPelicula.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedPelicula;
              this.dataSource.data = [...this.dataSource.data]; // Para disparar la actualización de Angular
              
            }
            form.reset();
            this.getPeliculas();
            this.selection.clear(); 
            console.log('pelicula actualizada',updatedPelicula);
          },
          error: (err) => {
            console.error('Error al actualizar el usuario', err);
          }
        });
      // }else{console.log('no entra')}
    }
    
    prepareUpdateForm() {
      if (this.isExactlyOneSelected()) {
        this.selectedPelicula = { ...this.selection.selected[0] };
      }
    }

  formatTime(time: string): string {
  const parts = time.split(':');
  if (parts.length === 2) {
    const [hours, minutes] = parts;
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
  } else if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  } else {
    return time; // o devuelve un valor predeterminado si la cadena no tiene el formato correcto
  }
}

}
