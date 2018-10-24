import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  constructor(private http: HttpClient){}
  showBanner: boolean = true;
  showTable: boolean = false;
  title = 'healcarepro365';
  providerName = '';
  provider = null;
  toggleForm($event) {
    this.showBanner = !this.showBanner;
  }

  getProvider() {
    this.http.get('http://localhost:8081/getProvider')
     .subscribe(data => {
      this.provider = data;
       this.provider = this.provider.providerList;
      this.showTable = true;
      })
     

  }
}
