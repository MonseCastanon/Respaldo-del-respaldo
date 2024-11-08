import { Component, OnInit } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem } from 'ngx-paypal';

@Component({
  selector: 'app-e-commerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.css']
})
export class ECommerceComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;
  public purchaseDetails: any = null;

  turismo = [
    { name: 'Paquete Turismo', quantity: 8, price: 10 },
  ]
  ecoadventure = [
    { name: 'Paquete Ecoadventure', quantity: 8, price: 12 },
  ]
  enoturismo = [
    { name: 'Paquete Enoturismo', quantity: 8, price: 269999 },
  ]
  xopantlaAulex = [
    { name: 'Paquete Xopantla Aulex', quantity: 8, price: 7000 },
  ]
  almaDolores = [
    { name: 'Paquete Viaje al Alma Dolores', quantity: 8, price: 6500 },
  ]
  CunaDeAmor = [
    { name: 'Paquete Cuna de Amor', quantity: 8, price: 16350 },
  ]

  cartItems: { name: string; price: number; quantity: number }[] = [];
  total: string = '';

  ngOnInit() {
    this.initConfig();
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.updateTotal();
  }

  removeFromCart(item: any) {
    const index = this.cartItems.findIndex(cartItem => cartItem.name === item.name);
    if (index !== -1) {
      this.cartItems[index].quantity--;
      if (this.cartItems[index].quantity <= 0) {
        this.cartItems.splice(index, 1);
      }
    }
    this.updateTotal();
  }

  updateTotal() {
    const totalAmount = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.total = totalAmount.toFixed(2);
  }

  private initConfig(): void {
    this.updateTotal();
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AYMKf9wbaTNI4bEdnPVXme2YuWS0Rfuzjagj-H2rAhTBLut6mCPHjVQloOxJfFhQxVIBt3pLtNKc66KE',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.total,
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.total
              }
            }
          },
          items: this.cartItems.map(item => <ITransactionItem>{
            name: item.name,
            quantity: item.quantity.toString(),
            category: 'PHYSICAL_GOODS',
            unit_amount: {
              currency_code: 'MXN',
              value: item.price.toString(),
            },
          })
        }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - Transaction completed', data);

        const itemCount = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const paqueteStatus = itemCount > 1 ? 'paquetes comprados' : 'es paquete comprado';
        const packageNames = this.cartItems.map(item => item.name).join(', ');

        this.purchaseDetails = {
          transactionId: data.id,
          status: paqueteStatus,
          packageName: packageNames,
          amount: data.purchase_units[0].amount.value,
          currency: data.purchase_units[0].amount.currency_code,
          payerEmail: data.payer.email_address
        };

        console.log('Detalles de la compra:', this.purchaseDetails);

        this.cartItems = [];
        this.updateTotal();
      },

      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  clearPurchaseDetails() {
    this.purchaseDetails = null;
    this.cartItems = [];
    this.updateTotal();
  }
}
