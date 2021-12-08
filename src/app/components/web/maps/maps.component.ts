import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/sitio.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements OnInit, AfterViewInit {
  site!: Site;
  public isCollapsed = true;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';
  lat = 37.75;
  lng = -122.41;
  closeResult = '';
  constructor(private modalService: NgbModal) { }


  ngOnInit(): void {
    this.site= new Site();

    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1IjoiaXNzY2pybXBhY2hlY28iLCJhIjoiY2t3cmN2bXFnMHZtYzJ2bzg5c244NmNjaCJ9.E2CAv5faFoKPnByeMq93SA',
      container: 'map',
      style: this.style,
      attributionControl: false,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    this.map.addControl(
      new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
    this.map.addControl(new mapboxgl.NavigationControl());

  }

  ngAfterViewInit(): void {

  }

  random_lat() {
    return Math.floor((Math.random() * (90 - (-90) + 1)) + (-90));
  }

  random_lng() {
    return Math.floor((Math.random() * (180 - (-180) + 1)) + (-180));
  }


  ir_a_marcador() {
    this.map.flyTo(
      {center:[this.lng,this.lat]}
    )
  }

  agregar_lugar(form:NgForm) {
    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.id = 'idUnico'
    markerHtml.className = '.marker';
    markerHtml.innerHTML = '<button type="button" (click)="open(content)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"> Launch demo modal </button> <!-- Modal --> <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body"> ... </div> <div class="modal-footer"> <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Save changes</button> </div> </div> </div> </div>';
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
      );
    let marcador = new mapboxgl.Marker(markerHtml,{draggable:true})
    this.lng=this.random_lng()
    this.lat=this.random_lat()
    marcador.setLngLat(this.map.getCenter())
    marcador.addTo(this.map)
    marcador.setPopup(popup)
    


    marcador.getElement()
      .addEventListener('click', () => {
        console.log('le di click al marcador ', marcador);
        alert('Hola Perro')
      });
  }

  open(content: any) {
    console.log(content)
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}


