import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  title = 'FileUploadProject';
  ImageBaseData:string | ArrayBuffer | undefined;
  


  imageSrc: string = '';
  user!: User;
  constructor(private userService: UserStayiserviceService,private router: Router,private messageService:MessageStayiserviceService,private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.user = new User();
  }

  createUser(form: NgForm): void  {
    console.log(this.user);
    this.user.imagen=this.imageSrc
    console.log(this.user);
    console.log(form);
    this.userService.createUser(this.user)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>{this.messageService.success()
        this.router.navigate(['./login'])
      }
  });
  }

  onFileChanged(event:any) {
    console.log('Imagen Cambiada')
    const file = event.target.files[0]
    console.log(typeof(file));
    console.log(file)
  }




  

  handleInputChange(e:any) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e:any) {
    let reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc)
  }









  
}
