import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Asiento } from '../../../models/Asiento';
import { AsientoService } from '../../../services/asiento.service';
import { FuncionAsientoService } from '../../../services/funcionAsiento.service';
import { Funcion } from '../../../models/Funcion';
import { FuncionService } from '../../../services/funcion.service';
import { data } from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';
import { FuncionAsiento } from '../../../models/FuncionAsiento';
import { HttpErrorResponse } from '@angular/common/http';
import { AsientoCompartidoService } from '../../../services/asientoCompartido.service';

@Component({
  selector: 'app-asientos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './asientos.component.html',
  styleUrl: './asientos.component.css'
})
export class AsientosComponent {
  selectedAsientos: Asiento[]=[];
  asiento: Asiento;
  funcion: Funcion;
  funcionesAsientos: FuncionAsiento[]=[];
  asientos: Asiento[]=[];
  funcionAsientos: FuncionAsiento;

  constructor(
    private _asientoService:AsientoService,
    private _funcionAsientoService: FuncionAsientoService,
    private _funcionService:FuncionService,
    private _funcionCompartida:AsientoCompartidoService,
    private router: Router, 
    private route: ActivatedRoute 
  ){
   this.asiento = new Asiento(1,0,"")
   this.funcion = new Funcion(0,0,"","","","",0)
   this.funcionAsientos = new FuncionAsiento(1,1,1,false)
  }

  ngOnInit(): void { 
    this.getAsientos();
    const id = this.route.snapshot.paramMap.get('id');
    this.obtenerFuncion(id);
    this.recibirFuncionAsientos()
  }

  getAsientos(){
    this._asientoService.index().subscribe({
      next:(response:any) =>{
        this.asientos = response['data'];
      }
    })
  }

  veridAsiento(asiento: Asiento): void {
    // No permitir la selección de asientos ocupados
    if (this.isOccupied(asiento)) {
      return;
    }
    const index = this.selectedAsientos.findIndex(a => a.numero === asiento.numero && a.fila === asiento.fila);
    if (index === -1) {
      this.selectedAsientos.push(asiento);
    } else {
      this.selectedAsientos.splice(index, 1);
    }
    console.log(this.selectedAsientos);
  }

  isOccupied(asiento: Asiento): boolean {
    return this.funcionesAsientos.some(
      fa => fa.idAsiento === asiento.id && fa.idFuncion === this.funcion.id && fa.estado
    );
  }

  isSelected(asiento: Asiento): boolean {
    return this.selectedAsientos.some(a => a.numero === asiento.numero && a.fila === asiento.fila);
  }

  obtenerFuncion(id:any){
    this._funcionService.show(id).subscribe(
      data=>{
        this.funcion = data['funcion']
        console.log(this.funcion)
      }
    )
  }
/** AGREGAR FUNCION */
 /* enviarFuncionAsientos(){
    this.selectedAsientos.forEach(element => {
    this.funcionAsientos.idFuncion =  this.funcion.id;
    this.funcionAsientos.idAsiento = element.id
    this.funcionAsientos.estado = true
    this._funcionAsientoService.create(this.funcionAsientos).subscribe({
      next:(response)=>{
        console.log(response)
      },error:(error:HttpErrorResponse)=>{
        console.log(error)
    }   
    })
    });
  }*/

    /*enviarServiceCompartido(){
      this._funcionCompartida.setSelectedAsientos(){

      }
    }*/

  recibirFuncionAsientos(){
    this._funcionAsientoService.index().subscribe({
      next:(response:any)=>{   console.log("entro funcion"),
        this.funcionesAsientos = response['data']
        console.log(this.funcionesAsientos)
      },error(error:any){
        console.log(error)
      }
    })
  }
}
