import { Component } from '@angular/core';
import { ComidaService } from '../../../services/comida.service';
import { ImagenService } from '../../../services/imagen.service';
import { Router } from '@angular/router';
import { Comida } from '../../../models/Comida';

@Component({
  selector: 'app-combos',
  standalone: true,
  imports: [],
  templateUrl: './combos.component.html',
  styleUrl: './combos.component.css',
  providers:[ComidaService]
})
export class CombosComponent {

public comida:Comida;
public comidas:Comida[]=[];
  constructor(
    private comidaService:ComidaService,
    private imagenService:ImagenService,
    private router: Router,
  ){
    this.comida=new Comida(1,'',0,'');
  }

  getComidas(){
    this.comidaService.index().subscribe({
      next: (response: any) => {
       this.comidas=response['data'];
      },
      error: (err: Error) => {
        console.log(err);
      }
    });
  }
}
