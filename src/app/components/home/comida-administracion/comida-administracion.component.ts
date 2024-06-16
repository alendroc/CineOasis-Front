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
import { Imagen } from '../../../models/Imagen';
import { ImagenService } from '../../../services/imagen.service';

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
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  updateFile: File | null = null;
  comida: Comida = new Comida(0, '', 0, '');
  public selectedComida = new Comida(1,"",1,"")

  public _comida: Comida;
  public _imagen:Imagen;
  constructor(
    private _comidaService: ComidaService,
    private _imagenService: ImagenService
  ) {
    this._comida = new Comida(1,"",0,"")
    this._imagen = new Imagen(1,1,"","")
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

  /*****************************CREACIÓN DE LAS FUNCIONES PRINCIPALES DEL CRUD*****************************/
  
  ngOnInit():void {
    this.getComidas();
  }

  /*****************************  GET  *****************************/

  getComidas() {
    this._comidaService.index().subscribe({
      next: async (response: any) => {
        const comidas = response['data'] as Comida[];
        for (let comida of comidas) {
          try {
            const imageBlob = await this._imagenService.getImage('comidas', comida.imagen).toPromise();
            comida.imagen = URL.createObjectURL(imageBlob);
          } catch (error) {
            console.error('Error al cargar la imagen de la comida', error);
          }
        }
        this.dataSource.data = comidas;
      },
      error: (err: Error) => {
        console.error('Error al cargar las comidas', err);
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

  storeComida(form: any): void {
    if (form.valid && this.selectedFile) {
      //Primero cargar la imagen
      this._imagenService.uploadImageStore(this.selectedFile, 'comidas').subscribe({
        next: (response) => {
          //Obtener el nombre de la imagen cargada en el Backend
          this.comida.imagen = response.filename; 
          this._comidaService.create(this.comida).subscribe({
            next: () => {
              this.getComidas();
              form.resetForm();
              this.selectedFile = null;
            },
            error: (err) => {
              console.error('Error al crear la comida', err);
              this.errorMessage = err.error.message || 'Error al crear la comida';
            }
          });
        },
        error: (err) => {
          console.error('Error al subir la imagen', err);
          this.errorMessage = err.error.message || 'Error al subir la imagen';
        }
      });
    } else {
      this.errorMessage = 'Formulario inválido o imagen no seleccionada';
    }
  }
  
  /*****************************  DELETE  *****************************/
  deleteSelectedComidas(): void {
    const selectedIds = this.selection.selected.map(comida => comida.id);
    selectedIds.forEach(id => {
      this._comidaService.delete(id).subscribe({
        next: () => {
          this.getComidas();
          this.selection.clear(); 
        },
        error: (err: Error) => {
          console.error('Error al eliminar la comida', err);
        }
      });
    });
  }

  /*****************************  UPDATE  *****************************/
  onUpdateFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.updateFile = file;
    }
  }

  prepareUpdateForm(): void {
    if (this.isExactlyOneSelected()) {
      this.selectedComida = this.selection.selected[0];
    }
  }

  updateComida(form: any): void {
    if (form.valid) {
      if (this.updateFile) {
        this._imagenService.uploadImageStore(this.updateFile, 'comidas').subscribe({
          next: (response) => {
            this.selectedComida.imagen = response.filename;
            this._comidaService.update(this.selectedComida).subscribe({
              next: () => {
                this.getComidas();
                form.resetForm();
                this.selection.clear();
                this.updateFile = null;
              },
              error: (err) => {
                console.error('Error al actualizar la comida', err);
              }
            });
          },
          error: (err) => {
            console.error('Error al subir la imagen', err);
          }
        });
      } else {
        this._comidaService.update(this.selectedComida).subscribe({
          next: () => {
            this.getComidas();
            form.resetForm();
            this.selection.clear();
          },
          error: (err) => {
            console.error('Error al actualizar la comida', err);
          }
        });
      }
    } else {
      this.errorMessage = 'Formulario inválido';
    }
  }

  
}
