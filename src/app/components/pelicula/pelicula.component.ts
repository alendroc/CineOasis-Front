import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Pelicula } from '../../models/Pelicula';
import { PeliculaService } from '../../services/pelicula.service';
import { ImagenService } from '../../services/imagen.service';
import { server } from '../../services/global';

@Component({
  selector: 'app-pelicula',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pelicula.component.html',
  styleUrl: './pelicula.component.css'
})
export class PeliculaComponent {

urlAPI: string | undefined;
public pelicula:Pelicula;
public status: number | undefined;
public imagenHorizontal: any[] = [];
public imagenVertical: any[] = [];
constructor(
  private _peliculaService:PeliculaService,
  private _imagenService: ImagenService,
  private _router: Router,
  private _routes: ActivatedRoute,
){
  this.urlAPI = server.url+'imagen/pelicula/';
  this.pelicula = new Pelicula(1,"","","","","","","","","","","")
}

ngOnInit():void{
  const id = this._routes.snapshot.paramMap.get('id');
  console.log('ID obtenido de la ruta:', id);
  if(id){
    this.getPelicula(id);
  }
}

getPelicula(id:string){
  this._peliculaService.show(id).subscribe(
     data => {
      const imagenH = this.pelicula.imagenes.find((imagen: { descripcion: string; }) => imagen.descripcion === 'horizontal');
      const imagenV =  this.pelicula.imagenes.find((imagen: { descripcion: string; }) => imagen.descripcion === 'vertical');
      this.pelicula = data['pelicula']
      this.imagenHorizontal = imagenH.imagen;
      this.imagenVertical = imagenV.imagen;
      console.log("aaaaaaaaaaaa"+this.imagenHorizontal)
      this.status = 1;
    },
    error => {
      console.error('Error al obtener la pelicula:', error);
      this.status = 0;
    }
  )
  }
}

