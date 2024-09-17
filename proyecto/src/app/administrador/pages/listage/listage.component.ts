import { Component, OnInit } from '@angular/core';
import { Agencia } from '../../interfaces/agencia.interface';
import { AgenciasService } from '../../services/agencia.service';

@Component({
  selector: 'app-listage',
  templateUrl: './listage.component.html',
  styleUrl: './listage.component.css'
})

export class ListageComponent implements OnInit {
  public agencias: Agencia[] = [];

  constructor(
    private agenciasService: AgenciasService,
  ){}
  ngOnInit(): void {
    this.agenciasService.getAgencias()
    .subscribe(agencias => this.agencias = agencias);
  }

}
