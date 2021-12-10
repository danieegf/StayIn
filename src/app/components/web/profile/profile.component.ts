import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { UserStayiserviceService } from 'src/services/user.stayiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  isReadonly=true
  imageSrc: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage['jwt']}`
      })
    };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageStayiserviceService,
    private userService:UserStayiserviceService
  ) {}

  ngOnInit(): void {
    console.log('https://stayinsafe-api.azurewebsites.net/api/User/GetUser/'+localStorage.getItem('UserId'))
    this.httpClient
      .get(
        'https://stayinsafe-api.azurewebsites.net/api/User/GetUser/'+localStorage.getItem('UserId'),
        this.httpOptions
      )
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.user = new User();
          this.user.p_Nombre = response.p_Nombre;
          this.user.s_Nombre = response.s_Nombre;
          this.user.apellido_Materno = response.apellido_Materno;
          this.user.apellido_Paterno = response.apellido_Paterno;
          console.log(response.fecha_Nacimiento.substr(0,10)); 
          this.user.fecha_Nacimiento = response.fecha_Nacimiento.substr(0,10);
          this.user.email = response.email;
          this.user.imagen = response.imagen;
          this.user.telefono = response.telefono;
          this.imageSrc = response.imagen;
        },
        error: (e) => this.messageService.error(),
        complete: () => {},
      });
  }

  updateUser(form: NgForm) {
    this.user.id=Number(localStorage.getItem('UserId'))
    this.user.fecha_Nacimiento=this.user.fecha_Nacimiento
    this.userService.updateUser(this.user).subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
  }

  editar(){
    this.isReadonly=false
  }
}



