import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';

import { LoginService } from 'app/pages/login/login.service';
import ls from 'localstorage-slim';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  oldpass: boolean = false;
  newpassword:any;
  confmpassword:any;
  password:any;
  constructor(
    private loginService: LoginService,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  focusOutFunction(val) {
    let data = {
      id:    ls.get('UserId', { decrypt: true }),
      pass: val,
      role:    ls.get('role', { decrypt: true })
    }
     
    this.loginService.CheckPassword(data).subscribe((res: any) => {
      if (res.length >= 1) {
        this.oldpass = false;
      }
      else {
        this.oldpass = true;
      }
    })
  }

  updatePassword(val){
    let data = {
      id:ls.get('UserId', { decrypt: true }),
      role:ls.get('role', { decrypt: true }),
      password: val
    };
    this.loginService.changePassword(data).subscribe((req) => {
      localStorage.clear();
      this.apiService.showNotification('top', 'right', 'Password changed Successfully. Login with new Password', 'success');
      this.router.navigate(['/pages/login']);
    })
  }
}
