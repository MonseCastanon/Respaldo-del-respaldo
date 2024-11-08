import { Component } from '@angular/core';
import { BingSearchService } from '../../services/bing-search.service';

@Component({
  selector: 'app-busqueda',
  template: ``,
})
export class BusquedaComponent {
  termino: string = '';
  resultados: any[] = [];

  constructor(private bingSearchService: BingSearchService) {}

  buscar() {
    this.bingSearchService.buscar(this.termino).subscribe((response) => {
      this.resultados = response.webPages?.value || [];
    });
  }
}
