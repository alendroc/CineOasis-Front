import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Asiento } from '../../../models/Asiento';
import { AsientoService } from '../../../services/asiento.service';

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asientos.component.html',
  styleUrl: './asientos.component.css'
})
export class AsientosComponent {
  asientosPrueba: number[] = [];
  asiento: Asiento;
  asientos: Asiento[]=[];

  constructor(
    private _asientoService:AsientoService
  ){
   this.asiento = new Asiento(1,0,"")
  }

  ngOnInit(): void {
    this.asientosPrueba = Array.from({ length: 140 }, (_, i) => i + 1);
    this.getAsientos();
  }
  getAsientos(){
    this._asientoService.index().subscribe({
      next:(response:any) =>{
        this.asientos = response['data'];
      }
    })
  }

  veridAsiento(numero:any,fila:any): void {
    // Cambiar el color de fondo del asiento al hacer clic
    console.log(fila+' '+numero);
    // Cambia este color por el que desees
  }
}
