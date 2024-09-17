import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { AtractivosService } from '../../services/atractivo.service';

@Component({
  selector: 'app-buscaratra',
  templateUrl: './buscaratra.component.html',
  styles: ``
})
export class BuscaratraComponent {

  public searchInput = new FormControl('');
  public atractivos: Atractivo[] = [];
  public selectedAtractivo?: Atractivo;

  constructor( private atractivosService: AtractivosService ){}

  searchAtractivos() {
    const value: string = this.searchInput.value || '';

   this.atractivosService.getSuggestions( value )
   .subscribe( atractivos => this.atractivos = atractivos);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedAtractivo = undefined;
      return;
    }

      const atractivos: Atractivo = event.option.value;
      this.searchInput.setValue( atractivos.nombre );

      this.selectedAtractivo = atractivos;

  }


}

