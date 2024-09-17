import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Restaurante } from '../../../interfaces/restaurante.interface';

@Component({
  selector: 'personalizado-restaurante-card',
  templateUrl: './personalizado.rest.html',
  styles: '',
})
export class PersonalizadoRestauranteComponent implements OnInit {

  @Input()
  public restaurante!: Restaurante;

  @Output() seleccionado = new EventEmitter<Restaurante>();

  ngOnInit(): void {
    if (!this.restaurante) throw Error('Restaurante property is required');
  }

  onSelect(event: any): void {
    this.restaurante.selected = event.target.checked;
    this.seleccionado.emit(this.restaurante);
  }
}
