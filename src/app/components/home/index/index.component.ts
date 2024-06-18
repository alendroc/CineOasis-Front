import { Component } from '@angular/core';
import { Imagen } from '../../../models/Imagen';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../services/imagen.service';
import { server } from '../../../services/global';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { Comida } from '../../../models/Comida';
import { ComidaService } from '../../../services/comida.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  providers:[ImagenService]
})
export class IndexComponent {
  public imagenPeli:Imagen;
  public comida:Comida;
  public comidas:Comida[]=[];
  public imagenesPeli: Imagen[] = [];
  public imagenesPeliAux: Imagen[] = [];
  urlAPI: string | undefined;
  imageURL: string;
  constructor(
    private _comidaService:ComidaService,
    private _imagenService:ImagenService
  ){
    this.imagenPeli = new Imagen(1,0,"","");
    this.comida = new Comida(1,"",0,"")
    this.urlAPI = server.url+'imagen/pelicula/';
    this.imageURL=server.url+'imagen/search/comidas/';
  }

  ngOnInit(): void {
    this.indexTodasLasPeliculas();
    this.getComidas();
  }
  indexTodasLasPeliculas(){
     this._imagenService.indexImagesForPelicula().subscribe({
      next: (response:any) =>{
      this.imagenesPeli = response['data'];
        this.imagenesPeliAux = this.imagenesPeli.filter((imagen: Imagen) => 
        imagen.descripcion.toLowerCase().includes('vertical'))
      console.log(this.imagenesPeliAux)
    },
      error: (err: Error) => {}
    });
  }

  getComidas(){
    this._comidaService.index().subscribe({
      next: (response: any) => {
        console.log("consoleGetcomida",response)
        this.comidas = response.data.slice(0, 2);
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }


}
