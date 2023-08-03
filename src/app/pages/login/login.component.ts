import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from 'app/api.service';
import { LoginService } from './login.service';
import { FormGroup } from '@angular/forms';
import { Loginuser } from './login.model';
import { Router } from '@angular/router';
import ls from 'localstorage-slim';
declare var $: any;
@Component({
    // moduleId: module.id,
    selector: 'login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    focus:any;
    focus1:any;
    focus2:any;
    test: Date = new Date();
    loginForm: FormGroup;
    public loginModel: any={} ;
    account_validation_messages = {
        'email': [
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', message: 'Enter a valid email' }
        ],
    }
    private toggleButton;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    constructor(
        private element: ElementRef,
        private loginService: LoginService,
        private router: Router,
        private apiService: ApiService
    ) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        ls.clear();
    }
    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');
        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.checkFullPageBackgroundImage();
        var body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700)
    }
    ngOnDestroy() {
        var body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    login(credentials) {
        localStorage.clear();
        console.log("......data...." + credentials.email);
        this.loginService.userLogin(credentials).subscribe(data => {
            if (data == 1) {
                this.apiService.showNotification('top', 'right', 'Wrong Email!', 'danger');
            }
            else if (data == 2) {
                this.apiService.showNotification('top', 'right', 'Wrong Password!', 'danger');
            }
            else {
                if (data[0].role == 'Admin') {
                    this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
                    ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
                    ls.set('lastInTime', data[0].last_login, { encrypt: true }); 
                    ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
                    ls.set('UserId', data[0].id, { encrypt: true });
                    ls.set('authenticationToken', data[0].token, { encrypt: true });
                    ls.set('role', data[0].role, { encrypt: true });
                    this.router.navigate(['dashboard']);
                }
                else if (data[0].role == 'Customer') {
                      debugger
                    this.apiService.showNotification('top', 'right', 'Customer successfully Login.', 'success');
                    // localStorage.setItem('authenticationToken', data[0].token);
                    // localStorage.setItem('UserId', data[0].uid);
                    // localStorage.setItem('UserName', data[0].fname + ' ' + data[0].lname);
                    // localStorage.setItem('VIP', data[0].vip);
                    // localStorage.setItem('role', data[0].role);
                    // localStorage.setItem('lastOutTime',data[0].last_inTime);
                    // localStorage.setItem('lastInTime',data[0].last_login);
                    // localStorage.setItem('member',data[0].ismembership);

                    ls.set('VIP', data[0].vip, { encrypt: true });
                    ls.set('member', data[0].ismembership, { encrypt: true });
                    ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
                    ls.set('lastInTime', data[0].last_login, { encrypt: true }); 
                    ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
                    ls.set('UserId', data[0].id, { encrypt: true });
                    ls.set('authenticationToken', data[0].token, { encrypt: true });
                    ls.set('role', data[0].role, { encrypt: true });

                    this.router.navigate(['dashboard']);
                }  
               else if (data[0].role == 'Sub-Admin') {
                     
                    this.apiService.showNotification('top', 'right', 'Admin successfully Login.', 'success');
                    // localStorage.setItem('authenticationToken', data[0].token);
                    // localStorage.setItem('UserId', data[0].id);
                    // localStorage.setItem('UserName', data[0].firstname + ' ' + data[0].lastname);
                    // localStorage.setItem('role', data[0].role);
                    // localStorage.setItem('lastOutTime',data[0].out_time);
                    // localStorage.setItem('lastInTime',data[0].last_login);

                
                    ls.set('lastOutTime', data[0].last_login, { encrypt: true }); // "mÆk¬�k§m®À½½°¹¿¯..."
                    ls.set('lastInTime', data[0].last_login, { encrypt: true }); 
                    ls.set('UserName', data[0].firstname + ' ' + data[0].lastname, { encrypt: true });
                    ls.set('UserId', data[0].id, { encrypt: true });
                    ls.set('authenticationToken', data[0].token, { encrypt: true });
                    ls.set('role', data[0].role, { encrypt: true });
                    this.router.navigate(['dashboard']);
                }
                // else {
                //     this.router.navigate(['dashboard']);
                // }
            }
        });
    }

}
