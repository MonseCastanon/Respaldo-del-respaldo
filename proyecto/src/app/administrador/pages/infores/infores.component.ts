import { Component, OnInit } from '@angular/core';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { RestaurantesService } from '../../services/restaurante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infores',
  templateUrl: './infores.component.html',
  styleUrl: './infores.component.css'
})
export class InforesComponent implements OnInit{
  public restaurante?: Restaurante;
  constructor(
    private restaurantesService:RestaurantesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.restaurantesService.getRestauranteById(id) ),
      )
      .subscribe( restaurante => {
        if ( !restaurante) return this.router.navigate(['/administrador/listado']);

        this.restaurante = restaurante;
        console.log(restaurante);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('administrador/listado')
  }

}
