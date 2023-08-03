import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs'
import { Injectable, Inject } from '@angular/core';
// import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import ls from 'localstorage-slim';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'app/api.service';

// import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        // @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
        private router: Router,
        // private toastr: ToastrManager
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      debugger
         let token: any =ls.get('authenticationToken', { decrypt: true });
         console.log(token);
        // let adminToken: any = ls.get('authenticationToken', { decrypt: true }) 
                if (request.url != ApiService.getUserLoginURL && request.url != ApiService.getRegisterOtpURL && ApiService.saveUserCustomerListURL) {
                  debugger  
                  console.log("in the interceptor") 
                  request = request.clone({ headers: request.headers.set('x-access-token', token) });
                     return next.handle(request).pipe(catchError(err => {
                        if (err.status == 401 || err.status ==111) {
                            // auto logout if 401 response returned from api
                            console.log('http error')
                           this.router.navigate(['/pages/login']);
                        }
                        const error = err.error.statusText || err.statusText;
                        return throwError(error);
                    }))
                }
                else {
                    return next.handle(request);
                }
            
        
    }
}