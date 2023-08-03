
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Enquiry } from './enquiry.model';

@Injectable({
    providedIn: 'root'
})
export class EnquiryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllEnquiryList(): Observable<Enquiry[]> {
        return this.httpClient.get<any>(ApiService.getAllEnquiryListURL);
    }
    removeEmployeeList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeEmployeeListURL, data);
    }
    updateActiveStatusList(admin: Enquiry): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateEnquiryStatusURL, admin);
    }

}
