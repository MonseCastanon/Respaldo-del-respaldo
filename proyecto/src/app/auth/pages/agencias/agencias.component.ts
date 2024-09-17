import { Component, OnInit } from '@angular/core';
import { Agencia } from '../../interfaces/agencia.interface';
import { AgenciasService } from '../../services/agencia.service';

@Component({
  selector: 'app-agencias',
  templateUrl: './agencias.component.html',
  styleUrl: './agencias.component.css'
})
export class AgenciasComponent implements OnInit {
  public agencias: Agencia[] = [];

  constructor(
    private agenciasService: AgenciasService,
  ){}
  ngOnInit(): void {
    this.agenciasService.getAgencias()
    .subscribe(agencias => this.agencias = agencias);
  }

}
