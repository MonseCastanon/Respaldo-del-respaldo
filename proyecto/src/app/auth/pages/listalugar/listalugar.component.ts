import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { HotelesService } from '../../services/hotel.service';
import { RestaurantesService } from '../../services/restaurante.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-listalugar',
  templateUrl: './listalugar.component.html',
  styleUrls: ['./listalugar.component.css']
})
export class ListalugarComponent implements OnInit {

  private map:any;
  private userMarker: L.Marker<any> | undefined;

  public hoteles: Hotel[] = [];
  public restaurantes: Restaurante[] = [];

  constructor(
    private hotelesService: HotelesService,
    private restaurantesService: RestaurantesService
  ){}
  ngOnInit(): void {
    this.initMap();
    this.hotelesService.getHoteles()
    .subscribe(hoteles => {
      this.hoteles = hoteles.filter(hotel=>
        hotel.nombre.trim().toLowerCase() !== 'no especificado'
      )
    });

    this.restaurantesService.getRestaurantes()
    .subscribe(restaurantes =>
      {
        this.restaurantes = restaurantes.filter(restaurante=>
          restaurante.nombre.trim().toLowerCase() !== 'no especificado'
        )
      });
  }

  ngAfterViewInit(): void {
    // Retrasar la inicialización del mapa para asegurarse de que el DOM esté completamente listo
    setTimeout(() => {
      this.initMap();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map').setView([21.1561, -100.9310], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    //const popup = L.popup().setLatLng([21.1561, -100.9310]).setContent("Dolores Hidalgo").openOn(this.map);
    const marker = L.marker([21.1561, -100.9310]).addTo(this.map)
      .openPopup()
      .bindPopup('Aqui andamos');
  }
}