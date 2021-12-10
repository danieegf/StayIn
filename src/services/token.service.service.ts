import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class TokenServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }),
  };


  jwtHelper = new JwtHelperService();
  
  constructor() { }

  loginSetToken(response : any){
    const helper = new JwtHelperService();
    console.log(typeof(response))
    const decoded= helper.decodeToken(response.jwt);
    console.log(decoded);
    localStorage.setItem('jwt', response.jwt);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('refreshTokenExpiryTime', response.refreshTokenExpiryTime);
    localStorage.setItem('UserId', decoded.UserId);
    localStorage.setItem('UserName', decoded.UserId);
    console.log(localStorage['jwt'])
    localStorage.setItem('expiration', decoded.exp);    
    return true
  }
}
