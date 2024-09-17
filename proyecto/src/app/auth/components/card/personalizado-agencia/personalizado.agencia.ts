import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Agencia } from '../../../interfaces/agencia.interface';

@Component({
  selector: 'personalizado-agencia-card',
  templateUrl: './personalizado.agencia.html',
  styles: '',
})
export class PersonalizadoAgenciaComponent implements OnInit {

  @Input()
  public agencia!: Agencia;

  // @Output() seleccionado = new EventEmitter<Agencia>();
  public selected: boolean = false;

  ngOnInit(): void {
    if (!this.agencia) throw Error('Agencia property is required');
  }

  seleccionarAgencia(event: any, agencia: Agencia) {
    agencia.selected = event.target.value;

    // console.log( 'correo: '+ agencia.selected);
    this.selected = !this.selected;
  }
}
