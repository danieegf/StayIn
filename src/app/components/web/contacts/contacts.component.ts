import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactStayiserviceService } from 'src/services/contact.stayiservice.service';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, OnDestroy {
   headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage['jwt']}`
  })
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${localStorage['jwt']}`
      })
    };
  // httpOptions = {
  //   headers:{
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Headers': 'Content-Type',
  //     'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`
  //   },
  // };
  contact!: Contact;
  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data!: any;
  constructor(
    private http: HttpClient,
    private contactService: ContactStayiserviceService,
    private messageService: MessageStayiserviceService
  ) {}
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.contact = new Contact();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
    };        
    localStorage.setItem('myData','sdsd')
    this.headers.append('Content-Type', 'application/json')
    localStorage.setItem('whatever', 'something');
    console.log(localStorage.getItem('whatever'));
    const retrievedObject = localStorage.getItem('whatever')
    console.log(retrievedObject)
    // console.log('retrievedObject: ', JSON.parse(retrievedObject));


    console.log(this.httpOptions)
    this.http
      .get(
        'https://stayinsafe-api.azurewebsites.net/api/Contactos/GetContacts/1',
        this.httpOptions
      )
      .subscribe({
        next: (response) => this.dtTrigger.next,
        error: (e) => this.messageService.error(),
        complete: () => this.messageService.success(),
      });
  }

  // console.log(res)
  // this.data = res;
  // this.dtTrigger.next;

  createContact(form: NgForm) {
    console.log(this.contact);
    console.log(form);
    this.contactService.createUser(this.contact).subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
  }

  deleteContact(form: NgForm) {
    console.log(this.contact);
    console.log(form);
    this.contactService.deleteContact(this.contact).subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () => this.messageService.success(),
    });
  }
}
