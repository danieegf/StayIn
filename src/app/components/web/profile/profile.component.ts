import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  imageSrc: string = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage['jwt']}`,
    }),
  };
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageStayiserviceService
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
          this.user.fecha_Nacimiento = response.fecha_Nacimiento;
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
    this.user = new User();
    this.user.p_Nombre = this.user.p_Nombre;
    this.user.s_Nombre = this.user.s_Nombre;
    this.user.apellido_Materno = this.user.apellido_Materno;
    this.user.apellido_Paterno = this.user.apellido_Paterno;
    this.user.fecha_Nacimiento = this.user.fecha_Nacimiento;
    this.user.email = this.user.email;
    this.user.pass = this.user.pass;
    this.user.imagen = this.user.imagen;
    console.log(this.user);
    console.log(form);
  }
}
