import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs";
import { Agencia } from "../../interfaces/agencia.interface";
import { AgenciasService } from "../../services/agencia.service";

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
        console.log(agencia);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('auth/agencias')
  }
}
