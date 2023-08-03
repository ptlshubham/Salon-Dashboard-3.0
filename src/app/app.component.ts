import { Component } from '@angular/core';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(
    private router:Router
  ){
    if(ls.get('authenticationToken', { decrypt: true }) != undefined){

    }else{
      this.router.navigate(['pages/login'])
    }
   
  }
}
