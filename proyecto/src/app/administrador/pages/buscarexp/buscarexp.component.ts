import { Component } from '@angular/core';
import { Experiencia } from '../../interfaces/experiencia.interface';
import { FormControl } from '@angular/forms';
import { ExperienciasService } from '../../services/experiencia.service';
import { MatAutocompleteActivatedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscarexp',
  templateUrl: './buscarexp.component.html',
  styles: [
  ]
})
export class BuscarexpComponent {

  public searchInput = new FormControl('');
  public experiencias: Experiencia[] = [];
  public selectedExperiencia?: Experiencia;

  constructor( private experienciasService: ExperienciasService ){}

  searchExperiencias() {
    const value: string = this.searchInput.value || '';

   this.experienciasService.getSuggestions( value )
   .subscribe( experiencias => this.experiencias = experiencias);
  }


  onSelectedOption( event: MatAutocompleteActivatedEvent ): void {
    if (!event.option?.value) {
      this.selectedExperiencia = undefined;
      return;
    }

      const experiencia: Experiencia = event.option.value;
      this.searchInput.setValue( experiencia.nombre );

      this.selectedExperiencia = experiencia;

  }


}

