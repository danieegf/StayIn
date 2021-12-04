import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  constructor() { }


  ngOnInit(): void {
    // this.map = new mapboxgl.Map({
    //   accessToken: 'pk.eyJ1IjoiaXNzY2pybXBhY2hlY28iLCJhIjoiY2t3cmN2bXFnMHZtYzJ2bzg5c244NmNjaCJ9.E2CAv5faFoKPnByeMq93SA',
    //   container: 'map',
    //   style: this.style,
    //   attributionControl: false,
    //   zoom: 13,
    //   center: [this.lng, this.lat]
    // });
    // Add map controls
    // this.map.addControl(new mapboxgl.NavigationControl());
    // this.map.addControl(new mapboxgl.FullscreenControl());
  }

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiaXNzY2pybXBhY2hlY28iLCJhIjoiY2t3cmN2bXFnMHZtYzJ2bzg5c244NmNjaCJ9.E2CAv5faFoKPnByeMq93SA',
      container: 'map',
      style: this.style,
      attributionControl: false,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.id = 'idUnico'
    markerHtml.className = '.marker';
    markerHtml.innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Launch demo modal </button>';
    let marcador = new mapboxgl.Marker(markerHtml)
    marcador.setLngLat([this.lng, this.lat])
    marcador.addTo(this.map)

    marcador.getElement()
      .addEventListener('click', () => {
        console.log('le di click al marcador ', marcador);
        alert('Hola Perro')
      });

  }
}


