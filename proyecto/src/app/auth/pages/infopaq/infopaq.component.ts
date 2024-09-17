import { Component, OnInit } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';
import { PaquetesService } from '../../services/paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infopaq',
  templateUrl: './infopaq.component.html',
  styleUrl: './infopaq.component.css'
})
export class InfopaqComponent implements OnInit{
  public paquete?: Paquete;
  constructor(
    private paquetesService:PaquetesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.paquetesService.getPaqueteById(id) ),
      )
      .subscribe( paquete => {
        if ( !paquete) return this.router.navigate(['/auth/paquetes']);

        this.paquete = paquete;
        console.log(paquete);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('/auth/paquetes')
  }
}
