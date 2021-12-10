import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Site } from 'src/app/models/sitio.model';
import { NgForm } from '@angular/forms';
import { SiteStayiserviceService } from 'src/services/site.stayiservice.service';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { Comments } from 'src/app/models/comment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavbarService } from 'src/services/navBarService';

interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})


export class MapsComponent implements OnInit, AfterViewInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage['jwt']}`
      })
    };
  site!: Site;
  comment!: Comments;
  lstcomments!:Comments[]
  propiedades!: Propiedad[] 
  public isCollapsedSiteForm = true;
  public isCollapsedCommentForm = true;
  map!: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/dark-v10';
  lat = 37.75;
  lng = -122.41;
  closeResult = '';
  constructor(private http: HttpClient,private siteService: SiteStayiserviceService,private messageService:MessageStayiserviceService) { }

  



  ngOnInit(): void {
    this.http.get('https://stayinsafe-api.azurewebsites.net/api/Comentarios/GetComments/1',this.httpOptions).
    subscribe({
      next: (response : any) => this.lstcomments = response,
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
    

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


    //Carga de comentarios

    


  }

  ngAfterViewInit(): void {

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

    marcador.setLngLat(this.map.getCenter())
    marcador.addTo(this.map)
    marcador.setPopup(popup)
    


    marcador.getElement()
      .addEventListener('click', () => {
        console.log('le di click al marcador ', marcador);
        alert('Hola Perro')
      });
  }

  createSite(form: NgForm){
    console.log(this.site);
    console.log(form);
    this.siteService.createSite(this.site)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>this.messageService.success()
  });
  }

  createComment(form: NgForm){
    console.log(this.site);
    console.log(form);
    this.siteService.createSite(this.site)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>this.messageService.success()
  });
  }


  
}


