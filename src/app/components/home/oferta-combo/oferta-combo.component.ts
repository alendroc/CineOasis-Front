import { Component } from '@angular/core';
import { ComidaService } from '../../../services/comida.service';
import { ImagenService } from '../../../services/imagen.service';
import { Router } from '@angular/router';
import { Comida } from '../../../models/Comida';
import { server } from '../../../services/global';
import { CommonModule } from '@angular/common';
import { AsientoCompartidoService } from '../../../services/asientoCompartido.service';

@Component({
  selector: 'app-oferta-combo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oferta-combo.component.html',
  styleUrl: './oferta-combo.component.css'
})
export class OfertaComboComponent { 
  value: number = 0;
  public comida:Comida;
  public comidasSeleccionadas: { comida: Comida, cantidad: number}[] = [];
  public comidas:Comida[]=[];
  imageURL: string;
    constructor(
      private comidaService:ComidaService,
      private imagenService:ImagenService,
      private router: Router,
      private _funcionCompartida: AsientoCompartidoService
    ){
      this.comida=new Comida(1,'',0,'');
      this.imageURL=server.url+'imagen/search/comidas/';
   
    }
  
    ngOnInit():void{
         this.getComidas();
         
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
    getQuantity(comida: Comida): number {
      const existingComida = this.comidasSeleccionadas.find(c => c.comida.id === comida.id);
      return existingComida ? existingComida.cantidad : 0;
    }

    increment(comida: Comida) {
      const existingComida = this.comidasSeleccionadas.find(c => c.comida.id === comida.id);
      this.getTodasLasComidasSeleccionadas()
      if (existingComida) {
        existingComida.cantidad++;
      } else {
        this.comidasSeleccionadas.push({ comida, cantidad: 1 });
      }
    }
  
    decrement(comida: Comida) {
      const existingComida = this.comidasSeleccionadas.find(c => c.comida.id === comida.id);
      this.getTodasLasComidasSeleccionadas()
      if (existingComida) {
        if (existingComida.cantidad > 0) {
          existingComida.cantidad--;
          if (existingComida.cantidad === 0) {
            this.comidasSeleccionadas = this.comidasSeleccionadas.filter(c => c.comida.id !== comida.id);
          }
        }
      }
    }

    getTodasLasComidasSeleccionadas(){
      console.log(this.comidasSeleccionadas)
    }

    enviarServiceCompartido(){
    this._funcionCompartida.setSelectedComidas(this.comidasSeleccionadas)
    console.log("Comidas GET:",this._funcionCompartida.getSelectedComidas())
    console.log("Asientos GET:",this._funcionCompartida.getSelectedAsientos())
   this.router.navigate(['/pago']);
  }
    
}
