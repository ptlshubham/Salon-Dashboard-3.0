
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Vendor } from './vendor.model';

@Injectable({
    providedIn: 'root'
})
export class VendorService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveVendorList(admin: Vendor): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveVendorListURL, admin);
    }
    getAllVendorList(): Observable<Vendor[]> {
        return this.httpClient.get<any>(ApiService.getAllVendorURL);
    }
    removeVendorList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeVendorListURL, data);
    }
    updateVenList(admin: Vendor): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateVendorListURL, admin);
    }

}
