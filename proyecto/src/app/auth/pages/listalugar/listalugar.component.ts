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
  private userMarker: L.Marker<any> | undefined;
  private userLatLng: L.LatLng | undefined;

  public hoteles: Hotel[] = [];
  public restaurantes: Restaurante[] = [];

  constructor(
    private hotelesService: HotelesService,
    private restaurantesService: RestaurantesService
  ){}

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
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Actualizar o agregar el marcador en la ubicación del usuario
        // if (this.userMarker) {
        //   this.userMarker.setLatLng([lat, lng]);
        // } else {
        //   this.userMarker = L.marker([lat, lng]).addTo(this.map)
        //     .bindPopup('Aquí andas jsjs')
        //     .openPopup();
        // }

        // Guardar la ubicación actual
        this.userLatLng = L.latLng(lat, lng);

        // Centrar el mapa en la ubicación del usuario
        this.map.setView([lat, lng], 13);

        // Volver a agregar la ruta si ya existe la ubicación del usuario
        this.initMap(); // Recalcular la ruta con la ubicación actual
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
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Verificar si la ubicación del usuario está disponible antes de agregar la ruta
      L.Routing.control({
        waypoints: [
          L.latLng(20.915296, -100.744232),  // Ubicación del usuario
          L.latLng(21.160063, -100.940102)  // Hotel Cielito lindo
        ]
      }).addTo(this.map);  // Agregar la ruta al mapa
    }
}
