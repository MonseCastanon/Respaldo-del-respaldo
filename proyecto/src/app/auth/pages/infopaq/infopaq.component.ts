import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Paquete } from '../../interfaces/paquete.interface';
import { PaquetesService } from '../../services/paquete.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import * as L from 'leaflet';

@Component({
  selector: 'app-infopaq',
  templateUrl: './infopaq.component.html',
  styleUrls: ['./infopaq.component.css']
})
export class InfopaqComponent implements OnInit {

  // private map:any;
  // private userMarker: L.Marker<any> | undefined;

  public paquete?: Paquete;
  constructor(
    private paquetesService:PaquetesService,
    private activateRoute: ActivatedRoute,
    private router:Router,
  ){}
    ngOnInit(): void {
      // this.initMap();
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

  // ngAfterViewInit(): void {
  //   // Retrasar la inicialización del mapa para asegurarse de que el DOM esté completamente listo
  //   setTimeout(() => {
  //     this.initMap();
  //   }, 0);
  // }

  // private initMap(){
  //   this.map = L.map('map').setView([-17.78629, -63.18117], 13);
  //   L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);
  // }
}
