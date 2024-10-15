import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit, OnInit {

  private map: any;
  private userMarker: L.Marker<any> | undefined;

  ngOnInit(): void {
    this.initMap();
  }

  ngAfterViewInit(): void {
    // Retrasar la inicialización del mapa para asegurarse de que el DOM esté completamente listo
    setTimeout(() => {
      this.initMap();
      this.trackUserLocation();
    }, 0);
  }

  private initMap(): void {
    this.map = L.map('map').setView([21.160063, -100.940102], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

  }

  private trackUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Actualizar o agregar el marcador en la ubicación del usuario
        if (this.userMarker) {
          this.userMarker.setLatLng([lat, lng]);
        } else {
          this.userMarker = L.marker([lat, lng]).addTo(this.map)
            .bindPopup('Aquí andas jsjs')
            .openPopup();
        }

        // Centrar el mapa en la ubicación del usuario
        this.map.setView([lat, lng], 13);
      }, (error) => {
        console.error('Error obteniendo la ubicación: ', error);
      });
    } else {
      console.error('Geolocalización no es soportada por este navegador.');
    }
  }
}
