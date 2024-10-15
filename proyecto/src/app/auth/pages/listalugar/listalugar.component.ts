import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { HotelesService } from '../../services/hotel.service';
import { RestaurantesService } from '../../services/restaurante.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';  // Importar leaflet-routing-machine

@Component({
  selector: 'app-listalugar',
  templateUrl: './listalugar.component.html',
  styleUrls: ['./listalugar.component.css']
})
export class ListalugarComponent implements AfterViewInit, OnInit {

  private map: any;

  public hoteles: Hotel[] = [];
  public restaurantes: Restaurante[] = [];

  constructor(
    private hotelesService: HotelesService,
    private restaurantesService: RestaurantesService
  ) { }

  ngOnInit(): void {
    // Cargar hoteles y restaurantes
    this.hotelesService.getHoteles()
      .subscribe(hoteles => {
        this.hoteles = hoteles.filter(hotel =>
          hotel.nombre.trim().toLowerCase() !== 'no especificado'
        );
      });

    this.restaurantesService.getRestaurantes()
      .subscribe(restaurantes => {
        this.restaurantes = restaurantes.filter(restaurante =>
          restaurante.nombre.trim().toLowerCase() !== 'no especificado'
        );
      });

    this.initMap();  // Inicializar el mapa
  }

  ngAfterViewInit(): void {
    // Retrasar la inicialización del mapa para asegurarse de que el DOM esté completamente listo
    setTimeout(() => {
      this.initMap();
      this.trackUserLocation();  // Rastrear ubicación del usuario
    }, 0);
  }

  private trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const localUser = new L.LatLng(position.coords.latitude, position.coords.longitude);

        const userMarker = L.marker(localUser).addTo(this.map);
        userMarker.bindPopup('Aqui estas tu');

        const hotelCielo = L.latLng(21.160063, -100.940102); // ? Hotel Cielito lindo
        const hotelSpa = L.latLng(21.154696, -100.925697);// ? Hotel Spa
        const hotelPosadaCampanas = L.latLng(21.169065, -100.935974); // ? Hotle posada las campanas
        const hotelAnber = L.latLng(21.157530, -100.933060); // ? Hotel anber
        const hotelRelicario = L.latLng(21.155169, -100.924240); // ? Hotel Relicario
        const hotelSanDiego = L.latLng(21.162374, -100.938683); // ? Hotel San Diego
        const hotelCasaMexico = L.latLng(21.158813, -100.933578); // ? Hotel Casa Mexico
        const hotelTresRaices = L.latLng(21.087433, -100.798409); // ?hotel tres raices
        const hotelRefugio = L.latLng(21.156733, -100.933830); // ? Hotel Refugio
        const cabañasNogales = L.latLng(21.175854, -100.959831); // ? Cabañas los nogales
        const hotelZanys = L.latLng(21.154634, -100.937126); // ? Hotel el jazmín de Zanya
        const hotelRayo = L.latLng(21.158024, -100.932785); // ? Hotel casa pozo del rayo
        const posadaBernardino = L.latLng(21.186563, -100.888329); // ? Posada de San Beranardiño
        const hotelHidalgo = L.latLng(21.155924, -100.935646); // ? Hotel Hidalgo

        userMarker.openPopup;

        L.Routing.control({
          waypoints: [
            localUser,
            hotelCielo,
            hotelSpa,
            hotelPosadaCampanas,
            hotelAnber,
            hotelRelicario,
            hotelSanDiego,
            hotelCasaMexico,
            hotelTresRaices,
            hotelRefugio,
            cabañasNogales,
            hotelZanys,
            hotelRayo,
            posadaBernardino,
            hotelHidalgo
          ],
          addWaypoints: false,
          show: false,
          showAlternatives: false,
          routeWhileDragging: false,
        }).addTo(this.map);

      }, (error) => {
        console.error('Error obteniendo la ubicación: ', error);
      });
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }

  private initMap(): void {
    // Crear el mapa centrado en la ubicación
    this.map = L.map('map').setView([21.1561, -100.9310], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
