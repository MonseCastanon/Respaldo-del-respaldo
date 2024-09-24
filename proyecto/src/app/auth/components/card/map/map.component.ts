import { AfterViewInit, Component } from '@angular/core';
import { HereService } from '../../../services/here.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements AfterViewInit {
  constructor(private hereService: HereService) {}

  ngAfterViewInit(): void {
    const mapContainer = document.getElementById('mapContainer')
  }
}
