import { Injectable } from '@angular/core';
import { Asiento } from '../models/Asiento';
import { Funcion } from '../models/Funcion';
import { FuncionAsiento } from '../models/FuncionAsiento';

@Injectable({
  providedIn: 'root'
})
export class AsientoCompartidoService {
  private selectedAsientos: FuncionAsiento[] = [];
  private selectedFuncionId: number | undefined;

  setSelectedAsientos(asientos: FuncionAsiento[], funcionId: number) {
    this.selectedAsientos = asientos;
    this.selectedFuncionId = funcionId;
  }

  getSelectedAsientos(): FuncionAsiento[] {
    return this.selectedAsientos;
  }

  getSelectedFuncionId(): number | undefined {
    return this.selectedFuncionId;
  }
}