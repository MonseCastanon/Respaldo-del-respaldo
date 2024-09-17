import { Component, OnInit } from '@angular/core';
import { Agencia } from '../../interfaces/agencia.interface';
import { AgenciasService } from '../../services/agencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infoage',
  templateUrl: './infoage.component.html',
  styleUrl: './infoage.component.css'
})
export class InfoageComponent implements OnInit{
  public agencia?: Agencia;
  constructor(
    private agenciasService:AgenciasService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.agenciasService.getAgenciaById(id) ),
      )
      .subscribe( agencia => {
        if ( !agencia) return this.router.navigate(['/administrador/listage']);

        this.agencia = agencia;
        // console.log('dato typescript',agencia);
        console.log(agencia);
        // console.log(this.agencia.nombre);
        return;


      })
  }

  goBack():void{
    this.router.navigateByUrl('administrador/listage')
  }

}
