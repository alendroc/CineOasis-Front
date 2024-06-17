import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pelicula } from '../../models/Pelicula';
import { PeliculaService } from '../../services/pelicula.service';
import { ImagenService } from '../../services/imagen.service';
import { server } from '../../services/global';
import { CommonModule } from '@angular/common';
import { FuncionService } from '../../services/funcion.service';
import { Funcion } from '../../models/Funcion';
import { error } from 'jquery';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {

urlAPI: string | undefined;
public pelicula:Pelicula;
public status: number | undefined;
public funciones: Funcion[] = [];
public funcionesAux: Funcion[] = [];
public imagenHorizontal: any[] = [];
public imagenVertical: any[] = [];
constructor(
  private _peliculaService:PeliculaService,
  private _imagenService: ImagenService,
  private _funcionService:FuncionService,
  private _routes: ActivatedRoute,
){
  this.urlAPI = server.url+'imagen/pelicula/';
  this.pelicula = new Pelicula(1,"","","","","","","","","","","")
}

ngOnInit():void{
  const id = this._routes.snapshot.paramMap.get('id');
  console.log('ID obtenido de la ruta:', id);
  if(id!=null){
    this.getPelicula(id);
  }
}

getPelicula(id:string){
  this._peliculaService.show(id).subscribe(
     data => {
     this.pelicula = data['pelicula']
     this.getFuncionesPelicula(id)
      if (this.pelicula && this.pelicula.imagenes) {
        const imagenH = this.pelicula.imagenes.find((imagen: { descripcion: string; }) => imagen.descripcion === 'horizontal');
        if (imagenH) {
          this.imagenHorizontal = imagenH.imagen;
        } else {
          console.warn('No se encontró una imagen con la descripción "horizontal".');
        }
      } else {
        console.error('La película o las imágenes de la película no están definidas.');
      }
    },
    error => {
      console.error('Error al obtener la pelicula:', error);
      this.status = 0;
    }
  )
  }

    getFuncionesPelicula(idPeli:string){
     this._funcionService.index().subscribe({
        next: (response:any) =>{
        this.funciones = response['data']
        this.funcionesAux = this.funciones.filter((funcion: Funcion) => 
        funcion.idPelicula.toString().includes(idPeli.toString()))
             console.log(this.funcionesAux);
        },
        error:(error:any)=>{}
      }) 

      }
       
  
}

