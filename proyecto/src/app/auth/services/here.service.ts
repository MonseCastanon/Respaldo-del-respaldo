import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HereService {
  private platform: any;

  constructor() {
    // Inicializa la plataforma de HERE con la API Key obtenida
    this.platform = new H.service.Platform({
      apikey: 'TU_API_KEY_AQUÍ'
    });
  }

  // Método para cargar un mapa en un elemento HTML
  public loadMap(mapContainer: HTMLElement) {
    const defaultLayers = this.platform.createDefaultLayers();
    const map = new H.Map(mapContainer, defaultLayers.vector.normal.map, {
      zoom: 10,
      center: { lat: 52.5159, lng: 13.3777 }
    });
    return map;
  }
}
