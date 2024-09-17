import { Component } from '@angular/core';
import { Itinerario } from '../../interfaces/itinerario.interface';
import { FormControl } from '@angular/forms';
import { ItinerariosService } from '../../services/itinerario.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscariti',
  templateUrl: './buscariti.component.html',
  styles: ``
})
export class BuscaritiComponent {

  public searchInput = new FormControl('');
  public itinerarios: Itinerario[] = [];
  public selectedItinerario?: Itinerario;

  constructor( private itinerariosService: ItinerariosService ){}

  searchItinerarios() {
    const value: string = this.searchInput.value || '';

   this.itinerariosService.getSuggestions( value )
   .subscribe( itinerarios => this.itinerarios = itinerarios);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedItinerario = undefined;
      return;
    }

      const itinerario: Itinerario = event.option.value;
      this.searchInput.setValue( itinerario.nombre );

      this.selectedItinerario = itinerario;

  }


}

