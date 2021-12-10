import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { NavbarService } from 'src/services/navBarService';
import { TokenServiceService } from 'src/services/token.service.service';
import { UserStayiserviceService } from 'src/services/user.stayiservice.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user!: User;
  header!: HeaderComponent;
  constructor(
    private tokenServiceService: TokenServiceService,
    private userService: UserStayiserviceService,
    private messageService: MessageStayiserviceService,
    private router:Router,
    public nav: NavbarService
  ) {}

  ngOnInit(): void {
    //Inicializar usuario
    this.user = new User();
  }

  login(form: NgForm) {
    console.log(this.user);
    console.log(form);
    this.userService.login(this.user).subscribe({
      next: (response) => this.tokenServiceService.loginSetToken(response),
      error: (e) => this.messageService.error(),
      complete: () => {
        this.messageService.success(),
        localStorage.setItem('logged_in', 'true');   
        this.router.navigate(['./maps'])
        this.nav.show();
      },
    });
  }
}
