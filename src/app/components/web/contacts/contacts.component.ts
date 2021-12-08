import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactStayiserviceService } from 'src/services/contact.stayiservice.service';
import { MessageStayiserviceService } from 'src/services/message.stayiservice.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  contact!: Contact;
  public isCollapsed = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  data!: any;
  constructor(private http: HttpClient,private contactService: ContactStayiserviceService,private messageService:MessageStayiserviceService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.contact= new Contact();
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5
    }

    // this.http.get('https://stayinsafe-api.azurewebsites.net/api/Contactos/GetContacts/1').
    this.http.get('https://stayinsafe-api.azurewebsites.net/api/Contactos/GetContacts/1').
      subscribe((res: any) => {
        console.log(res)
        this.data = res;
        this.dtTrigger.next;
      });
  }

  createContact(form: NgForm){
    console.log(this.contact);
    console.log(form);
    this.contactService.createUser(this.contact)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>this.messageService.success()
  });
  }

  deleteContact(form: NgForm){
    console.log(this.contact);
    console.log(form);
    this.contactService.deleteContact(this.contact)
    .subscribe({
      next: (response) => console.log(response),
      error: (e) => this.messageService.error(),
      complete: () =>this.messageService.success()
  });
  }

}
