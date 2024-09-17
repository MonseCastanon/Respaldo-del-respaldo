import { Component, Input, OnInit } from '@angular/core';
import { Paquete } from '../../../interfaces/paquete.interface';

@Component({
  selector: 'paquetes-paquete-card',
  templateUrl: './paquete.component.html',
  styleUrl: './paquete.component.css'
})
export class PaqueteComponent implements OnInit {

  @Input()
  public paquete!: Paquete;
  ngOnInit(): void {
    if ( !this.paquete ) throw Error('Paquete property is required')
  }

}
