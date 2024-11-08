import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';
import { PaquetesService } from '../../services/paquete.service';
import { Itinerario } from '../../../administrador/interfaces/itinerario.interface';
import { ItinerariosService } from '../../services/itinerario.service';

declare var paypal: any;  //Se utiliza la constante de PayPal

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrl: './paquetes.component.css',
})
export class PaquetesComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  producto = {
    descripcion: 'producto en venta',
    precio: 1000.00,
    img: 'imagen del producto'
  }
  title = 'angular-paypal-payment';

  public paquetes: Paquete[] = [];
  public itinerarios: Itinerario[] = [];

  constructor(
    private paquetesService: PaquetesService,
    private itinerariosService: ItinerariosService,
  ) { }
  ngOnInit(): void {
    this.paquetesService.getPaquetes()
      .subscribe(paquetes => this.paquetes = paquetes);


    this.itinerariosService.getItinerarios()
      .subscribe(itinerarios => this.itinerarios = itinerarios);
    paypal
      .Buttons({
        createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { description: string; amount: { currency_code: string; value: number; }; }[]; }) => any; }; }) => {
          return actions.order.create({
            purchase_units: [{
              description: this.producto.descripcion,
              amount: {
                currency_code: 'MXN',
                value: this.producto.precio
              }
            }
            ]
          })
        },
        onApprove: async (data: any, actions: { order: { capture: () => any; }; }) => {
          const order = await actions.order.capture();
          console.log(order);
        }
      })
      .render(this.paypalElement.nativeElement);
  }
}
