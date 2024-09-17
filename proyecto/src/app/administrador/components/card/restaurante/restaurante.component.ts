import { Component, Input, OnInit } from '@angular/core';
import { Restaurante } from '../../../interfaces/restaurante.interface';

@Component({
  selector: 'restaurantes-restaurante-card',
  templateUrl: './restaurante.component.html',
  styleUrl: './restaurante.component.css'
})
export class RestauranteComponent implements OnInit {

  @Input()
  public restaurante!: Restaurante;
  ngOnInit(): void {
    if ( !this.restaurante ) throw Error('Restaurante property is required')
  }

}
