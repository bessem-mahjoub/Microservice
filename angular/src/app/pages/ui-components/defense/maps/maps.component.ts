import { Component, EventEmitter, Output } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent {
  private map: L.Map;
  private centroidH: L.LatLngExpression = [36.8981970128221, 10.189970708975915]; // Coordonnées pour le bloc H
  private centroidE: L.LatLngExpression = [36.89966874789553, 10.18982196413415]; // Coordonnées pour le bloc E
  private centroidM: L.LatLngExpression = [36.90225021696681, 10.189360434924096]; // Coordonnées pour le bloc M
  private userLocation: L.LatLngExpression;
  @Output() calculateRouteEvent: EventEmitter<string> = new EventEmitter<string>();

  // Méthode pour obtenir l'instance de la carte
  getMap(): L.Map {
    return this.map;
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroidH, // Changez cette ligne pour utiliser le bloc que vous souhaitez afficher initialement
      zoom: 15
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    L.Routing.control({
      waypoints: [
        L.latLng(this.centroidH),
        L.latLng(this.centroidE),
        L.latLng(this.centroidM),
        L.latLng(this.userLocation)
      ]
    }).addTo(this.map);

    // Ajouter le marqueur pour le bloc H
    L.marker(this.centroidH).addTo(this.map)
      .bindPopup('Bloc H - Esprit')
      .openPopup();

    // Ajouter le marqueur pour le bloc E
    L.marker(this.centroidE).addTo(this.map)
      .bindPopup('Bloc E - Esprit')
      .openPopup();

    // Ajouter le marqueur pour le bloc M
    L.marker(this.centroidM).addTo(this.map)
      .bindPopup('Bloc M - Esprit')
      .openPopup();

    // Ajouter le marqueur de votre position actuelle
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const userLocation: L.LatLngExpression = [latitude, longitude];

      L.marker(userLocation).addTo(this.map)
        .bindPopup('Votre position actuelle')
        .openPopup();

      this.map.setView(userLocation, 15);
    });
    this.calculateRouteEvent.subscribe((numeroDeBloc: string) => {
      const destination: L.LatLngExpression | null = this.getDestinationLatLng(numeroDeBloc);
      if (destination) {
        let destinationLatLng: L.LatLng;
        if (Array.isArray(destination)) {
          destinationLatLng = L.latLng(destination[0], destination[1]);
        } else {
          destinationLatLng = destination as L.LatLng;
        }
        L.Routing.control({
          waypoints: [
            L.latLng(this.userLocation),
            destinationLatLng
          ]
        }).addTo(this.map);
      } else {
        console.error("Destination coordinates not found for the bloc:", numeroDeBloc);
      }
    });
    
  }
    

  private getDestinationLatLng(numeroDeBloc: string): L.LatLngExpression | null {
    switch (numeroDeBloc) {
      case "H":
        return [36.8981970128221, 10.189970708975915];
      case "E":
        return [36.89966874789553, 10.18982196413415];
      case "M":
        return [36.90225021696681, 10.189360434924096];
      default:
        console.error("Destination coordinates not found for the bloc:", numeroDeBloc);
        return null;
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.initMap();
  }
}
