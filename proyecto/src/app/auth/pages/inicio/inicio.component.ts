import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit, OnInit {
  weatherData: any;
  // city: string = 'Guanajuato';
  showWeather: boolean = false;

  private map: any;
  isTwitchVisible = false;
  twitchUrl: SafeResourceUrl = '';
  images: any;

  constructor(private sanitizer: DomSanitizer, private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.initMap();
    this.getWeather();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      this.trackUserLocation();
      this.getWeather();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map').setView([21.160063, -100.940102], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  // Clima
  getWeather() {
    this.weatherService.getWeatherByCoordinates(21.155, -100.933).subscribe(data => {
      this.weatherData = data;
    });
  }

  toggleWeather() {
    this.showWeather = !this.showWeather; // Alterna la visibilidad de la ventana
  }

  toggleTwitchStream() {
    this.isTwitchVisible = !this.isTwitchVisible;

    if (this.isTwitchVisible) {
      const channelName = 'monse_castanon'; // Reemplaza con el nombre del canal de Twitch
      const url = `https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}`;
      this.twitchUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

//  Geolocalización
  private trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const localUser = new L.LatLng(position.coords.latitude, position.coords.longitude);

        const userMarker = L.marker(localUser, {
          icon: L.icon({
            iconUrl: 'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309741_640.png',
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000
        }).addTo(this.map);
        userMarker.bindPopup('Aquí está usted').openPopup();

        const DoloresCIN = L.latLng(21.156110, -100.932500);
        const DoloresCINMarker = L.marker(DoloresCIN, {
          icon: L.icon({
            iconUrl: 'https://cdn.pixabay.com/photo/2014/04/03/10/03/google-309739_960_720.png',
            iconSize: [25, 41], // Ajusta el tamaño según necesites
            iconAnchor: [12, 41] // Ancla del ícono
          }),
          zIndexOffset: 1000
        }).addTo(this.map);
        DoloresCINMarker.bindPopup('Este es Dolores Hidalgo C.I.N.');

      }, (error) => {
        console.error('Error obteniendo la ubicación: ', error);
      });
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }
}
