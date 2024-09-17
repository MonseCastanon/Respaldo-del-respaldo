import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Agencia } from '../../interfaces/agencia.interface';
import { AgenciasService } from '../../services/agencia.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscarage',
  templateUrl: './buscarage.component.html',
  styles: ``
})
export class BuscarageComponent {

  public searchInput = new FormControl('');
  public agencias: Agencia[] = [];
  public selectedAgencia?: Agencia;

  constructor( private agenciasService: AgenciasService ){}

  searchAgencias() {
    const value: string = this.searchInput.value || '';

   this.agenciasService.getSuggestions( value )
   .subscribe( agencias => this.agencias = agencias);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedAgencia = undefined;
      return;
    }
    
      const agencia: Agencia = event.option.value;
      this.searchInput.setValue( agencia.nombre );

      this.selectedAgencia = agencia;

  }


}

