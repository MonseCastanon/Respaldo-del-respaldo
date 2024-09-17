import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Atractivo } from '../../interfaces/atractivo.interface';
import { AtractivosService } from '../../services/atractivo.service';

@Component({
  selector: 'app-infoatra',
  templateUrl: './infoatra.component.html',
  styleUrl: './infoatra.component.css'
})
export class InfoatraComponent implements OnInit{
  public atractivo?: Atractivo;
  constructor(
    private atractivosService:AtractivosService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.atractivosService.getAtractivoById(id) ),
      )
      .subscribe( atractivo => {
        if ( !atractivo) return this.router.navigate(['/auth/experiencias']);

        this.atractivo = atractivo;
        console.log(atractivo);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('auth/experiencias')
  }

}


