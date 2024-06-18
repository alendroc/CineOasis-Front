import { Injectable } from '@angular/core';
import { Asiento } from '../models/Asiento';
import { Funcion } from '../models/Funcion';
import { FuncionAsiento } from '../models/FuncionAsiento';
import { Subject } from 'rxjs';
import { Comida } from '../models/Comida';

@Injectable({
  providedIn: 'root'
})
export class AsientoCompartidoService {
  public comidasSeleccionadas: { comida: Comida, cantidad: number }[] = [];
  public selectedAsientos: FuncionAsiento[] = [];
  public selectedFuncionId: number = 0;
  public modalTriggerSource = new Subject<void>();
  modalTrigger$ = this.modalTriggerSource.asObservable();

  /*---------Select--------*/
  setSelectedAsientos(asientos: FuncionAsiento[]) {
    this.selectedAsientos = asientos;
  }
  setSelectedComidas(comidas: { comida: Comida, cantidad: number }[]) {
    this.comidasSeleccionadas = comidas;
  }
  setSelectFuncion(funcion:number){
    this.selectedFuncionId = funcion
  }
  /*---------Get--------*/
  getSelectedAsientos(): FuncionAsiento[] {
    return this.selectedAsientos;
  }

  getSelectedFuncionId(): number {
    return this.selectedFuncionId;
  }

  getSelectedComidas(){
   return this.comidasSeleccionadas
  }
}