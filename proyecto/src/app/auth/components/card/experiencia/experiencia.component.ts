import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from '../../../interfaces/experiencia.interface';

@Component({
  selector: 'experiencias-experiencia-card',
  templateUrl: './experiencia.component.html',
  styles: ``
})
export class ExperienciaComponent implements OnInit {

  @Input()
  public experiencia!: Experiencia;
  ngOnInit(): void {
    if ( !this.experiencia ) throw Error('Experiencia property is required')
  }

}
