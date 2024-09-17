import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { HotelesService } from '../../services/hotel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent implements OnInit{
  public hotel?: Hotel;
  constructor(
    private hotelesService:HotelesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      this.activateRoute.params
      .pipe(
        switchMap(({ id }) => this.hotelesService.getHotelById(id) ),
      )
      .subscribe( hotel => {
        if ( !hotel) return this.router.navigate(['/administrador/listado']);

        this.hotel = hotel;
        console.log(hotel);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('administrador/listado')
  }
}
