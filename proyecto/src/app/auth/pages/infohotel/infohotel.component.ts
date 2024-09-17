import { Component, OnInit } from '@angular/core';
import { HotelesService } from '../../services/hotel.service';
import { Hotel } from '../../interfaces/hotel.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-infohotel',
  templateUrl: './infohotel.component.html',
  styleUrl: './infohotel.component.css'
})
export class InfohotelComponent implements  OnInit{
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
        if ( !hotel) return this.router.navigate(['/auth/atractivos']);

        this.hotel =hotel;
        console.log(hotel);
        return;
      })
  }
  goBack():void{
    this.router.navigateByUrl('auth/listalugar')
  }


}
