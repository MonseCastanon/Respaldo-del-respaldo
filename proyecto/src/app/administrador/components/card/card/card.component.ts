import { Component, Input, OnInit } from '@angular/core';
import { Hotel } from '../../../interfaces/hotel.interface';

@Component({
  selector: 'hoteles-hotel-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {

  @Input()
  public hotel!: Hotel;
  ngOnInit(): void {
    if ( !this.hotel ) throw Error('Hotel property is required')
  }

}
