import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';
import { UserStayiserviceService } from 'src/services/user.stayiservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user!: User;
  constructor(private userService: UserStayiserviceService,private router: Router,private messageService:MessageStayiserviceService) {}

  ngOnInit(): void {
    this.user = new User();
  }

  createUser(form: NgForm): void  {
    
    console.log(this.user);
    console.log(form);
    this.userService.createUser(this.user)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>this.messageService.success()
  });

  }
 
}
