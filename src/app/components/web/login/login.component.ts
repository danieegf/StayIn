import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { TokenServiceService } from 'src/services/token.service.service';
import { UserStayiserviceService } from 'src/services/user.stayiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user!: User;
  
  constructor(private tokenServiceService: TokenServiceService,private userService: UserStayiserviceService,private messageService:MessageStayiserviceService) { }

  ngOnInit(): void {
    //Inicializar usuario
    this.user= new User();
  }


  login(form: NgForm) {
    console.log(this.user);
    console.log(form);
    this.userService.login(this.user).subscribe({
      next: (response) =>       
      this.tokenServiceService.loginSetToken(response),
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
  }


}
