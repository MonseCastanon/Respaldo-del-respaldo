import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Hotel } from '../../interfaces/hotel.interface';
import { Restaurante } from '../../interfaces/restaurante.interface';
import { HotelesService } from '../../services/hotel.service';
import { RestaurantesService } from '../../services/restaurante.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';  // Importar leaflet-routing-machine
import 'leaflet.awesome-markers';


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

        const userMarker = L.marker(localUser, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-Background-PNG.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        userMarker.bindPopup('Aqui está usted').openPopup();

        // const hotelCielo = L.latLng(21.160063, -100.940102); // ? Hotel Cielito Lindo
        // const cieloMarker = L.marker(hotelCielo).addTo(this.map);
        // cieloMarker.bindPopup('Hotel Cielito');

        const hotelCielo = L.latLng(21.160063, -100.940102);
        const cieloMarker = L.marker(hotelCielo, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        cieloMarker.bindPopup('Hotel Cielito');

        const hotelSpa = L.latLng(21.154696, -100.925697); // ? Hotel Spa
        const spaMarker = L.marker(hotelSpa, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        spaMarker.bindPopup('Hotel Spa');

        const hotelPosadaCampanas = L.latLng(21.169065, -100.935974); // ? Hotel Posada Las Campanas
        const campanasMarker = L.marker(hotelPosadaCampanas, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        campanasMarker.bindPopup('Hotel Posada Las Campanas');

        const hotelAnber = L.latLng(21.157530, -100.933060); // ? Hotel Anber
        const anberMarker = L.marker(hotelAnber, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        anberMarker.bindPopup('Hotel Anber');

        const hotelRelicario = L.latLng(21.155169, -100.924240); // ? Hotel Relicario
        const relicarioMarker = L.marker(hotelRelicario, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        relicarioMarker.bindPopup('Hotel Relicario');

        const hotelSanDiego = L.latLng(21.162374, -100.938683); // ? Hotel San Diego
        const sanDiegoMarker = L.marker(hotelSanDiego, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        sanDiegoMarker.bindPopup('Hotel San Diego');

        const hotelCasaMexico = L.latLng(21.158813, -100.933578); // ? Hotel Casa México
        const casaMexicoMarker = L.marker(hotelCasaMexico, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        casaMexicoMarker.bindPopup('Hotel Casa México');

        const hotelTresRaices = L.latLng(21.087433, -100.798409); // ? Hotel Tres Raíces
        const tresRaicesMarker = L.marker(hotelTresRaices, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        tresRaicesMarker.bindPopup('Hotel Tres Raíces');

        const hotelRefugio = L.latLng(21.156733, -100.933830); // ? Hotel El Refugio
        const refugioMarker = L.marker(hotelRefugio, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        refugioMarker.bindPopup('Hotel El Refugio');

        const cabañasNogales = L.latLng(21.175854, -100.959831); // ? Cabañas Los Nogales
        const nogalesMarker = L.marker(cabañasNogales, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        nogalesMarker.bindPopup('Cabañas Los Nogales');

        const hotelZanys = L.latLng(21.154634, -100.937126); // ? Hotel El Jazmín de Zanya
        const zanysMarker = L.marker(hotelZanys, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        zanysMarker.bindPopup('Hotel El Jazmín de Zanya');

        const hotelRayo = L.latLng(21.158024, -100.932785); // ? Hotel Casa Pozo del Rayo
        const rayoMarker = L.marker(hotelRayo, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        rayoMarker.bindPopup('Hotel Casa Pozo del Rayo');

        const posadaBernardino = L.latLng(21.186563, -100.888329); // ? Posada de San Bernardino
        const bernardinoMarker = L.marker(posadaBernardino, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        bernardinoMarker.bindPopup('Posada de San Bernardino');

        const hotelHidalgo = L.latLng(21.155924, -100.935646); // ? Hotel Hidalgo
        const hidalgoMarker = L.marker(hotelHidalgo, {
          icon: L.icon({
            iconUrl: 'https://www.pngall.com/wp-content/uploads/10/Map-Marker-PNG-HD-Image.png', // Ruta del ícono
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000 // Establece un zIndexOffset alto
        }).addTo(this.map);
        hidalgoMarker.bindPopup('Hotel Hidalgo');

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
          show: false,  // Esto debería evitar que se genere el panel
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
    this.map = L.map('map').setView([21.1561, -100.9310], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }
}
