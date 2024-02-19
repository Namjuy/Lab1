import { Component, OnChanges, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  map!: L.Map;
  marker!: L.Marker;
  initialView = { lat: 21.01158471251956, lng: 105.78064478236135, zoom: 19 }; // Define initial coordinates and zoom level
  polygon!: L.Polygon;
  triangleCoords: L.LatLng[] = []; // Define an array to store coordinates for creating polygons

  constructor() {}

  ngOnInit(): void {
    this.initMap(); // Initialize map when component is initialized
  }

  ngOnChanges(): void {}

  // Update the map view to the new coordinates after calling setCoordinate
  setCoordinate = (event: any): void => {
    this.initialView.lat = event.get('lat');
    this.initialView.lng = event.get('lng');
    this.initialView.zoom = event.get('zoom');

    // Set the new map view using the updated initial coordinates and zoom level
    this.map.setView(
      [this.initialView.lat, this.initialView.lng],
      this.initialView.zoom
    );
  };

  initMap = (): void => {
    // Initialize the map with the specified initial coordinates and zoom level
    this.map = L.map('map').setView(
      [this.initialView.lat, this.initialView.lng], // Set the initial coordinates
      this.initialView.zoom // Set the initial zoom level
    );

    // Add Google Maps tiles as a basemap layer
    L.tileLayer('https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 19, // Set maximum zoom level
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>', // Add attribution
    }).addTo(this.map);

    this.handleClickMap();

    // Add a draggable marker with a car icon to the map
    this.marker = L.marker([21.013959179519343, 105.78535964054002], {
      draggable: false,
      icon: L.icon({
        iconUrl: '../../../../assets/car_icon.png',
        iconSize: [32, 32],
      }),
    }).addTo(this.map);

    this.marker.bindPopup('Ô tô');
    this.marker.openPopup(); // Open the popup immediately after adding the marker to the map
  };

  // Remove the marker from the map
  clearMap = (): void => {
    if (this.marker != null) {
      this.map.removeLayer(this.marker);
    }
  };

  // Clear the map and reinitialize it
  reInitializeMap = (): void => {
    this.clearMap(); // Clear the map by removing the marker
    this.initMap(); // Reinitialize the map
  };

  // Handle clicks on the map
  handleClickMap = (): void => {
    // Add an event listener for 'click' events on the map
    this.map.addEventListener('click', (mapsMouseEvent) => {
      this.triangleCoords.push(mapsMouseEvent.latlng);
      this.createPolygon();
    });
  };

  // Create a polygon based on the triangleCoords array
  createPolygon = (): void => {
    if (this.polygon) {
      this.polygon.remove(); // Remove the existing polygon from the map
    }

    // Create a new polygon using the coordinates stored in the triangleCoords array
    this.polygon = L.polygon(this.triangleCoords, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
    }).addTo(this.map);
  };
}
