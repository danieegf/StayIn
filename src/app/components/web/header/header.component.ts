import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NavbarService } from 'src/services/navBarService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  constructor( public nav: NavbarService,private router: Router) {
  }


  ngOnInit(): void {
    

  }

  logout(){
    this.nav.hide()
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
