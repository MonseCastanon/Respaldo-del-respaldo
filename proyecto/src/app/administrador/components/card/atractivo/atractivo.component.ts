import { Component, Input, OnInit } from '@angular/core';
import { Atractivo } from '../../../interfaces/atractivo.interface';

@Component({
  selector: 'atractivos-atractivo-card',
  templateUrl: './atractivo.component.html',
  styles: ``
})
export class AtractivoComponent implements OnInit {

  @Input()
  public atractivo!: Atractivo;
  ngOnInit(): void {
    if ( !this.atractivo ) throw Error('Atractivo property is required')
  }

}
