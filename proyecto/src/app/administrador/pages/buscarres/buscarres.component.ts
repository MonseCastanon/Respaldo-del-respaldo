import { Component } from '@angular/core';
import { RestaurantesService } from '../../services/restaurante.service';
import { FormControl } from '@angular/forms';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscarres',
  templateUrl: './buscarres.component.html',
  styles: [
  ]
})
export class BuscarresComponent {

  public searchInput = new FormControl('');
  public restaurantes: Restaurante[] = [];
  public selectedRestaurante?: Restaurante;

  constructor( private restaurantesService: RestaurantesService ){}

  searchRestaurante() {
    const value: string = this.searchInput.value || '';

   this.restaurantesService.getSuggestions( value )
   .subscribe( restaurantes => this.restaurantes = restaurantes);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedRestaurante = undefined;
      return;
    }

      const restaurante: Restaurante = event.option.value;
      this.searchInput.setValue( restaurante.nombre );

      this.selectedRestaurante = restaurante;

  }
}
