import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/web/header/header.component';
import { FooterComponent } from './components/web/footer/footer.component';
import { HomeComponent } from './components/web/home/home.component';
import { LoginComponent } from './components/web/login/login.component';
import { SignupComponent } from './components/web/signup/signup.component';
import { ForgotpasswordComponent } from './components/web/forgotpassword/forgotpassword.component';
import { SupportComponent } from './components/web/support/support.component';
import { ProfileComponent } from './components/web/profile/profile.component';
import { ContactsComponent } from './components/web/contacts/contacts.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { MapsComponent } from './components/web/maps/maps.component';


@NgModule({
//Declaracion de todos y cada uno de los componentes a usar
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotpasswordComponent,
    SupportComponent,
    ProfileComponent,
    ContactsComponent,
    MapsComponent
  ],
//exportar componentes, directivas y canalizaciones que luego se pueden usar en otros módulos.
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule
  ],
//Inyección de Dependencias
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
