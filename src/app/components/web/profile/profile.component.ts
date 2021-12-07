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
    this.user.p_Nombre=this.user.p_Nombre;
    this.user.s_Nombre=this.user.s_Nombre;
    this.user.apellido_Materno=this.user.apellido_Materno;
    this.user.apellido_Paterno=this.user.apellido_Paterno;
    this.user.fecha_Nacimiento=this.user.fecha_Nacimiento;
    this.user.email=this.user.email;
    this.user.pass=this.user.pass;
    console.log(this.user)
    console.log(form)
  }

}
