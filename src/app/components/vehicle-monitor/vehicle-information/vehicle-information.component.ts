import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-vehicle-information',
  templateUrl: './vehicle-information.component.html',
  styleUrls: ['./vehicle-information.component.scss'],
})
export class VehicleInformationComponent implements OnInit {
  @Output() setCoordinates = new EventEmitter<any>();
  constructor() {}

  selectedCoordinate = new Map();
  ngOnInit(): void {} // Provide default implementation

  // Accepts latitude, longitude, and zoom as parameters
  selectVehicle = (lat: number, lng: number, zoom: number): void => {
    this.selectedCoordinate.set('lat',lat);
    this.selectedCoordinate.set('lng',lng);
    this.selectedCoordinate.set('zoom',zoom);
    this.setCoordinates.emit(this.selectedCoordinate);
  };
}
