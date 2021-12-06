import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/web/contacts/contacts.component';
import { ForgotpasswordComponent } from './components/web/forgotpassword/forgotpassword.component';
import { HomeComponent } from './components/web/home/home.component';
import { LoginComponent } from './components/web/login/login.component';
import { MapsComponent } from './components/web/maps/maps.component';
import { ProfileComponent } from './components/web/profile/profile.component';
import { SignupComponent } from './components/web/signup/signup.component'; 
import { SupportComponent } from './components/web/support/support.component';

//Definicón de Rutas
const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'signup',
  component: SignupComponent
},
{
  path: 'forgotpassword',
  component: ForgotpasswordComponent
},
{
  path: 'support',
  component: SupportComponent
},
{
  path: 'contacts',
  component: ContactsComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'maps',
  component: MapsComponent
},
{
  path: '**',
  redirectTo:'home'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
