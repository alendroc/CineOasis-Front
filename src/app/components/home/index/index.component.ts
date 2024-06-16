import { Component } from '@angular/core';
import { Imagen } from '../../../models/Imagen';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../services/imagen.service';
import { server } from '../../../services/global';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  providers:[ImagenService]
})
export class IndexComponent {
  public imagenPeli:Imagen;
  public imagenesPeli: Imagen[] = [];
  urlAPI: string | undefined;

  constructor(
    private _imagenService:ImagenService
  ){
    this.imagenPeli = new Imagen(1,0,"","");
    this.urlAPI = server.url+'imagen/pelicula/';
  }

  ngOnInit(): void {
    this.indexTodasLasPeliculas();
  }


  indexTodasLasPeliculas(){
     this._imagenService.indexImagesForPelicula().subscribe({
      next: (response:any) =>{
      this.imagenesPeli = response['data'];
      console.log(this.imagenesPeli)
    },
      error: (err: Error) => {}
    });
  }
}
