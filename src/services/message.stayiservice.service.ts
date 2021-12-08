import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageStayiserviceService {

  constructor() { }

  success(){
    Swal.fire({
        title: 'Usuario creado correctamente!!  :)',
        text: 'Ahora puedes iniciar sesíon',
        imageUrl: 'assets/images/success.png',
        imageWidth: 100,
        imageHeight: 100,
        imageAlt: 'Custom image',
        confirmButtonText: 'Aceptar',
        position: 'bottom',
        confirmButtonColor: '#30313a'
      })
  }
  error(){
    Swal.fire({
      title: 'Ha ocurrido un error :(',
      text:'Mensaje de Error',
      confirmButtonText: 'Aceptar',
      position: 'bottom',
      confirmButtonColor: '#30313a',
      imageUrl: 'assets/images/error.png',
      imageWidth: 100,
      imageHeight: 100,
      imageAlt: 'Custom image',
    });
  }
}
