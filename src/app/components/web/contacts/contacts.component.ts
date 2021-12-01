import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  // We use this trigger because fetching the list of persons can be quite long,
  // thus we ensure the data is fetched before rendering
  dtTrigger: Subject<any> = new Subject<any>();
  data!: any;
  constructor(private http: HttpClient) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 5
    }
    this.http.get('https://dummy.restapiexample.com/api/v1/employees').
      subscribe((res: any) => {
        this.data = res.data;
        console.log(res.data)
        console.log(this.data[0])
        this.dtTrigger.next;
      });
    // Probar Respuesta
    // this.http.get('https://dummy.restapiexample.com/api/v1/employees').subscribe(
    //   console.log
    // );
  }

}
