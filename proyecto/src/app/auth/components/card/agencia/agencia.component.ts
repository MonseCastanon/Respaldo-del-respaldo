import { Component, Input, OnInit } from '@angular/core';
import { Agencia } from '../../../interfaces/agencia.interface';

@Component({
  selector: 'agencias-agencia-card',
  templateUrl: './agencia.component.html',
  styles: ``
})
export class AgenciaComponent implements OnInit {

  @Input()
  public agencia!: Agencia;
  ngOnInit(): void {
    if ( !this.agencia ) throw Error('Agencia property is required')
  }

}
