import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../../../interfaces/hotel.interface';

@Component({
  selector: 'personalizado-hotel-card',
  templateUrl: './personalizado.hotel.html',
  styles: '',
})
export class PersonalizadoHotelComponent implements OnInit {

  @Input()
  public hotel!: Hotel;

  @Output() seleccionado = new EventEmitter<Hotel>();

  ngOnInit(): void {
    if (!this.hotel)
      throw new Error('Hotel property is required');
  }

  seleccionarHotel(event: any, hotel: Hotel) {
    hotel.selected = event.target.checked;
    this.seleccionado.emit(hotel);
  }
}
