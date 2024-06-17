import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Imagen } from '../../../models/Imagen';
import { ImagenService } from '../../../services/imagen.service';
import { server } from '../../../services/global';

@Component({
  selector: 'app-img-pelicula-administracion',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, 
    MatCheckboxModule,MatInputModule, MatTableModule ,MatPaginatorModule,
    MatButtonModule,ReactiveFormsModule, MatSlideToggleModule],
  templateUrl: './img-pelicula-administracion.component.html',
  styleUrl: './img-pelicula-administracion.component.css'
})
export class ImgPeliculaAdministracionComponent {

  displayedColumns: string[] = ['select', 'id', 'pelicula', 'descripcion', 'imagen'];
  dataSource = new MatTableDataSource<Imagen>([]);
  selection = new SelectionModel<Imagen>(true, []);
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  public selectedImagen = new Imagen(0,0,'','');
  public _imagenPelicula:Imagen;
  public imagenesPeliculas:Imagen[]=[];
  imageURL:string;
  constructor(
    private _imagenService: ImagenService
  ) {
    this._imagenPelicula = new Imagen(1,1,"",""),
    this.imageURL=server.url+'imagen/pelicula/'
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

  checkboxLabel(row?: Imagen): string {
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
    this.getImagenesPelicula();
  }

  /*****************************  GET  *****************************/

  getImagenesPelicula() {
    this._imagenService.indexImagesForPelicula().subscribe({
      next: async (response: any) => {
        this.imagenesPeliculas = response['data'];
        this.dataSource.data = this.imagenesPeliculas;
      },
      error: (err: Error) => {
        console.error('Error al cargar las imagenes de las peliculas', err);
      }
    });
  }

 

  /*****************************  STORE  *****************************/
  

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  storeImagePelicula(form: any) {
    if (this.selectedFile && form.valid) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('data', JSON.stringify({
        idPelicula: this._imagenPelicula.idPelicula,
        descripcion: this._imagenPelicula.descripcion
      }));

      this._imagenService.createImageForPelicula(formData).subscribe({
        next:(response)=>{
          console.log('imagen pelicula creada',response);
          this.getImagenesPelicula();
          form.resetForm();
          this.selectedFile = null;
        },
        error:(err:Error)=>{
          console.log(err);
        }
    });
  }
}
  
  /*****************************  DELETE  *****************************/
  deleteSelectedImagenesPelicula(): void {
    const selectedIdPeliculas = this.selection.selected.map(idPelicula => idPelicula.id);
    selectedIdPeliculas.forEach(id => {
      this._imagenService.destroyImagePelicula(id).subscribe({
        next: () => {
          this.getImagenesPelicula();
          this.selection.clear(); 
        },
        error: (err: Error) => {
          console.error('Error al eliminar la imagen pelicula', err);
        }
      });
    });
  }

  /*****************************  UPDATE  *****************************/
  onUpdateFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  prepareUpdateForm(): void {
    if (this.isExactlyOneSelected()) {
      this.selectedImagen = this.selection.selected[0];
    }
  }

  updateImagePelicula(form:any) {
 console.log(this.selectedImagen);
    if(this.selectedFile && this.selectedFile.size > 0)
      {
        console.log('tiene file');

        const formData = new FormData();
      formData.append('data', JSON.stringify({descripcion: this.selectedImagen.descripcion}));
        formData.append('file', this.selectedFile);
       
        this._imagenService.updateImageForPelicula(formData,this.selectedImagen.id).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.getImagenesPelicula();
            form.resetForm();
            this.selectedFile = null;
          },
          error:(err:Error)=>{
            console.log(err);
          }
        });
       
      }else{
        console.log('no tiene file');
        const formData = new FormData();
        formData.append('data', JSON.stringify({descripcion: this.selectedImagen.descripcion}));
        this._imagenService.updateImageForPelicula(formData,this.selectedImagen.id).subscribe({
          next:(response:any)=>{
            console.log(response);
            this.getImagenesPelicula();
            form.resetForm();
            this.selectedFile = null;
          },
          error:(err:Error)=>{
            console.log(err);
          }
        });

    }
    }
    

}
