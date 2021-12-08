import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { UserStayiserviceService } from 'src/services/user.stayiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  constructor(private userService: UserStayiserviceService,private messageService:MessageStayiserviceService) { }

  ngOnInit(): void {
    //Inicializar usuario
    this.user= new User();
    this.user.email="mail";
    this.user.pass="passwd";
  }


  login(form: NgForm) {
    // this.user.pass=this.user.email!+this.user.pass!;
    console.log(this.user);
    console.log(form);
    this.userService.login(this.user).subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
  }


}
