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
    this.user.Email="mail";
    this.user.Pass="passwd";
  }

  sumar(form:NgForm) {
    this.user.Pass=this.user.Email!+this.user.Pass!;
    console.log(this.user)
    console.log(form)
  }



}
