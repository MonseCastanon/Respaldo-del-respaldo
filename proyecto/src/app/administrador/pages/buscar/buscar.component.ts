import { Component } from '@angular/core';
import { HotelesService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';

import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {

  public searchInput = new FormControl('');
  public hoteles: Hotel[] = [];
  public selectedHotel?: Hotel;

  constructor( private hotelesService: HotelesService ){}

  searchHotel() {
    const value: string = this.searchInput.value || '';

   this.hotelesService.getSuggestions( value )
   .subscribe( hoteles => this.hoteles = hoteles);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedHotel = undefined;
      return;
    }

      const hotel: Hotel = event.option.value;
      this.searchInput.setValue( hotel.nombre );

      this.selectedHotel = hotel;

  }


}
