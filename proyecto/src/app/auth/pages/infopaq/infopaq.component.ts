import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';
import { PaquetesService } from '../../services/paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
declare var paypal: any;  //Se utiliza la constante de PayPal

@Component({
  selector: 'app-infopaq',
  templateUrl: './infopaq.component.html',
  styleUrls: ['./infopaq.component.css']
})
export class InfopaqComponent implements OnInit {
  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  producto = {
    descripcion: 'producto en venta',
    precio: 1000.00,
    img: 'imagen del producto'
  }
  title = 'angular-paypal-payment';

  // private map:any;
  // private userMarker: L.Marker<any> | undefined;

  public paquete?: Paquete;
  constructor(
    private paquetesService:PaquetesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      // this.initMap();
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.paquetesService.getPaqueteById(id) ),
      )
      .subscribe( paquete => {
        if ( !paquete) return this.router.navigate(['/auth/paquetes']);

        this.paquete = paquete;
        console.log(paquete);
        return;
      })
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
  goBack():void{
    this.router.navigateByUrl('/auth/paquetes')
  }
}
