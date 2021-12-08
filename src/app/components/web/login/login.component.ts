import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  constructor() { }

  ngOnInit(): void {
    //Inicializar usuario
    this.user= new User();
    this.user.email="mail";
    this.user.pass="passwd";
  }

  sumar(form:NgForm) {
    this.user.pass=this.user.email!+this.user.pass!;
    console.log(this.user)
    console.log(form)
  }



}
