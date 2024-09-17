import { Component, Input, OnInit } from '@angular/core';
import { Itinerario } from '../../../interfaces/itinerario.interface';

@Component({
  selector: 'itinerarios-itinerario-card',
  templateUrl: './itinerario.component.html',
  styleUrl: './itinerario.component.css'
})
export class ItinerarioComponent implements OnInit {

  @Input()
  public itinerario!: Itinerario;
  ngOnInit(): void {
    if ( !this.itinerario ) throw Error('Itinerario property is required')
  }

}
