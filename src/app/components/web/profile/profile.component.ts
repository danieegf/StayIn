import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: User;
  constructor() { }

  ngOnInit(): void {
    this.user= new User();
  }

  updateUser(form:NgForm){
    this.user.P_Nombre=this.user.P_Nombre;
    this.user.S_Nombre=this.user.S_Nombre;
    this.user.Apellido_Materno=this.user.Apellido_Materno;
    this.user.Apellido_Paterno=this.user.Apellido_Paterno;
    this.user.Fecha_Nacimiento=this.user.Fecha_Nacimiento;
    this.user.Email=this.user.Email;
    this.user.Pass=this.user.Pass;
    console.log(this.user)
    console.log(form)
  }

}
