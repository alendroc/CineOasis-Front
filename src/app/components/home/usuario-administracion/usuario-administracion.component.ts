import { Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-administracion',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive,RouterOutlet,MatFormFieldModule, MatCheckboxModule,MatInputModule, MatTableModule ,MatPaginatorModule],
  templateUrl: './usuario-administracion.component.html',
  styleUrl: './usuario-administracion.component.css'
})
export class UsuarioAdministracionComponent {
  displayedColumns: string[] = ['select', 'id', 'name', 'apellido', 'email', 'fechaNacimiento', 'permisoAdmin', 'imagen'];
  dataSource = new MatTableDataSource<User>([]);
  selection = new SelectionModel<User>(true, []);
  
  public _user: User;
  users: User[] = [];
  public selectedUser: User = new User(1, "", "", "", "", "", false, "");
  updateDialog: boolean = false;
  copyUser: User [] = []

  constructor(private _userService: UserService) {
    this._user= new User(1,"","","","","",false,"")
  }

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

  checkboxLabel(row?: User): string {
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
    //this.getUsers();
    this.loadUsers();
  }

  /*****************************  GET  *****************************/
  getUsers() {
    this._userService.index().subscribe({
      next: (response: any) => {
        this.users = response['data'];
        console.log();
      },
      error: (err: Error) => {
        console.error('Error al cargar los usuarios', err);
      }
    });
  }

  loadUsers() {
    this._userService.index2().subscribe(users => {
      this.dataSource.data = users;
    });
  }
  
  /*****************************  CREATE  *****************************/
  storeUser(form: any): void {
    if (form.valid) {
      this._userService.create(this._user).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.status==201){
          form.reset();            
            } else {
              console.error('No se pudo ingrear el usuario');
            }
          },
          error: (err: any) => {
            console.error(err);
          }
        });
        location.reload();
    }
  }

  /*****************************  CREATE  *****************************/
  deleteSelectedUsers() {
    this.selection.selected.forEach(user => {
      this._userService.delete(user.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
          this.selection.clear();
        },
        error: (err: any) => {
          console.error('Error al eliminar el usuario', err);
        }
      });
    });
  }

  /** 
  deleteSelectedUsers() {
    this.selectedUsers.forEach(_user => {
      this._userService.deleted(_user.id).subscribe({
        next: () => {
          this.users = this.users.filter(o => o.id !== _user.id);
          this.totalRecords--;
          console.log()
        },
        error: (err: Error) => {
          console.error('Error al eliminar el usuario', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: `Failed to delete user: ${_user.nombre}`,
            life: 3000
          });
        }
      });
    });
  */

    editUser(_artista: User) {
      this.selectedUser = { ..._artista };
      this.updateDialog = true;
    }

    updateUser2() {
      this._userService.update(this.selectedUser).subscribe({
        next: (response: any) => {
          console.log('Usuario actualizado', response);
          location.reload();
        },
        error: (err: any) => {
          console.error('Error al actualizar el usuario', err);
        }
      });
      
    }

    updateUser(form: any): void {
      if (form.valid) {
        this._userService.update(this.selectedUser).subscribe({
          next: (updatedUser) => {
            const index = this.dataSource.data.findIndex(user => user.id === updatedUser.id);
            if (index !== -1) {
              this.dataSource.data[index] = updatedUser;
              this.dataSource.data = [...this.dataSource.data]; // Para disparar la actualización de Angular
            }
            form.reset();
          },
          error: (err) => {
            console.error('Error al actualizar el usuario', err);
          }
        });
      }
    }
}