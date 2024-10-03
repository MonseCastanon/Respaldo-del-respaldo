import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {

  private map: any;
  private userMarker: L.Marker<any> | undefined;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.initMap();
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