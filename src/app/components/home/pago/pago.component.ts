import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsientoCompartidoService } from '../../../services/asientoCompartido.service';
import { FuncionAsientoService } from '../../../services/funcionAsiento.service';
import { DetallesComboService } from '../../../services/detallesCombo.service';
import { TicketService } from '../../../services/ticket.service';
import { FuncionAsiento } from '../../../models/FuncionAsiento';
import { HttpErrorResponse } from '@angular/common/http';
import { DetallesTicketService } from '../../../services/detallesTicket.service';
import { Comida } from '../../../models/Comida';
import { DetallesCombo } from '../../../models/DetallesCombo';
import { Ticket } from '../../../models/Ticket';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  creditCardName: string = '';
  expirationMonth: string = '';
  creditCardNumber: string = '';
  expirationYear: string = '';
  total: number=0;
  cvc: string = '';
  years:number[]=[];
  ano: number | null = null;
  mes: string | null = null;
  dia: string | null = null;
  idFuncionAux = 0;
  public comidasSeleccionadas: { comida: Comida, cantidad: number }[] = [];
  public funcionAsientos:FuncionAsiento[]=[];
  public detalleCombo: DetallesCombo;
  public ticket: Ticket;
  public identity:User;
  public idFuncion:any;
  constructor(
    private _serviceCompartido: AsientoCompartidoService,
    private _funcionAsientos: FuncionAsientoService,
    private _userService: UserService,
    private _comboDetalle: DetallesComboService,
    private _ticket:TicketService,
   private _ticketDetalle: DetallesTicketService,
  ){
    this.detalleCombo = new DetallesCombo(0,0,0,0,0,0,0)
    this.ticket = new Ticket(0,0,0," ",0)
    this.identity = new User(0," ","","","","",false,"")
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 20; i++) {
      this.years.push(currentYear + i);
  }
}
  ngOnInit(){
    this.loadIndentityAux()
  }
  /*-------------------------------Usuario del sesion storage-------------------------*/
  loadIndentityAux(){this.identity=this._userService.getIdentityFromStorage();
  console.log(this.identity)}
/*----------------------Funciones del front-end--------------------------------------*/
  formatCreditCard() {
    let value = this.creditCardNumber.replace(/\D/g, '').substring(0, 16); // Elimina todo lo que no sea dígito y limita a 16 caracteres
    let sections = value.match(/.{1,4}/g); // Divide en secciones de 4 dígitos
    this.creditCardNumber = sections ? sections.join('-') : ''; // Une las secciones con guiones
  }
  handleInput(event: any) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Elimina todo lo que no sea dígito
    input.value = value;
    this.creditCardNumber = value;
    this.formatCreditCard();
  }
  // Limitar la entrada a 4 dígitos y solo números
  handleYearInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').substring(0, 4); // Solo permite números y limita a 4 dígitos
  }
  handleCVCInput(event: any) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '').substring(0, 3); // Solo permite números y limita a 3 dígitos
  }
  onSubmit(paymentForm: any) {
    if (paymentForm.form.valid) {
      console.log('Éxito: Formulario válido. Realizando compra...');
          this.agregarAsiento();
          this.crearTicket();
      // Aquí podrías enviar los datos del formulario a un servicio o hacer alguna acción adicional
    } else {
  
    }
  }
   /*------------------------------------------------------------------------------------------------*/
  /*--------------------------------Funciones de almacenamiento-------------------------------------*/
  obtenerDatosPelicula(){
    this.funcionAsientos= this._serviceCompartido.getSelectedAsientos();
  }
  ObtenerDatosCombos(){
    this.comidasSeleccionadas = this._serviceCompartido.getSelectedComidas();
  }
  ObtenerIdFuncion(){
    this.idFuncion = this._serviceCompartido.getSelectedFuncionId();
  }

  ObtenerPrecioTotal(){
    this.ObtenerDatosCombos()
    let precioAsientos = this.funcionAsientos.length * 3500;
    let precioComidas = 0;
    this.comidasSeleccionadas.forEach(comida => {
      precioComidas += comida.cantidad * comida.comida.precio;
    });
  
    // Sumar ambos precios para obtener el total
    this.total = precioAsientos + precioComidas;
  }

  agregarAsiento(){
    this.obtenerDatosPelicula()
    this.funcionAsientos.forEach(element => {
      this._funcionAsientos.create(element).subscribe({
        next:(response)=>{
          console.log(response)
        },error:(error:HttpErrorResponse)=>{
        if(error.message === "No tiene privilegios para acceso al recurso")
          console.log(error)
        }   
      })
    });
  }

  agregarComboDetalle(){
    this.ObtenerDatosCombos()
    this.comidasSeleccionadas.forEach(comida =>{
      this.detalleCombo.cantidad = comida.cantidad
      this.detalleCombo.descuento = 0
      this.detalleCombo.idComida =  comida.comida.id
     /* this.detalleCombo.*/
     /*this._comboDetalle.create()*/
    })
  }

  crearTicket(){
    this.ObtenerPrecioTotal()
    this.idFuncionAux = this._serviceCompartido.getSelectedFuncionId()
    this.ticket.idUsuario = this.identity.id;
    this.ticket.idFuncion = this.idFuncionAux
    this.ticket.fechaCompra = this.dateToString(new Date())
    this.ticket.precioTotal = this.total
    console.log(this.ticket.idUsuario)
    console.log( this.ticket.idFuncion )
    console.log(this.ticket.fechaCompra)
    console.log(this.ticket.precioTotal)
    this._ticket.create(this.ticket).subscribe({
      next:(response)=>{
        console.log("tickeeeeet",response)
      },error:(error:HttpErrorResponse)=>{
        console.log(error)
      if(error.message === "No tiene privilegios para acceso al recurso")
        console.log(error)
        
      } 
    })
  }

  dateToString(date: Date): string {
    this.ano = date.getFullYear();
    this.mes = ('0' + (date.getMonth() + 1)).slice(-2); // Mes se cuenta desde 0
    this.dia = ('0' + date.getDate()).slice(-2);
    return `${this.ano}-${this.mes}-${this.dia}`;
  }


}
