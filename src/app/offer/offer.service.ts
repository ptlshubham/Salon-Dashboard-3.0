
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Appointment } from './offerappointment.model';
import { Offer } from './offer.model';


@Injectable({
    providedIn: 'root'
})
export class OfferService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveOfferList(admin: Offer): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveOfferListURL, admin);
    }
    getAllOfferList(): Observable<Offer[]> {
        return this.httpClient.get<any>(ApiService.getAllOfferURL);
    }
    getActiveOfferList(): Observable<Offer[]> {
        return this.httpClient.get<any>(ApiService.getActiveOfferURL);
    }
    saveAppointmentList(admin: Appointment): Observable<any> {
         
        return this.httpClient.post<any>(ApiService.saveAppointmentListURL, admin);
    }
    getAllAppointmentList(): Observable<Appointment[]> {
        return this.httpClient.get<any>(ApiService.getAllAppointmentURL);
    }
    getCompletedServices(): Observable<Appointment[]> {
        return this.httpClient.get<any>(ApiService.getAllCompletedServicesURL);
    }
    getViewAppointment(admin) {
        let data = {
            id: admin.id
        }
        return this.httpClient.post<any>(ApiService.getViewAppointmentURL, data);
    }
    updateOfferList(admin: Offer): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateOfferListURL, admin);
    }
    removeOfferDetails(id) {
        return this.httpClient.get<any>(ApiService.removeOfferDetailsURL + id);
    }
    getCustAllPoint(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getOfferTotalPointsURL, data);
    }
    getAllOfferDataList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getAllOfferDataListURL, data);
    }
    getServicesListUsingId(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByOfferURL, data);
    }
    activeDeavctiveOffers(admin: Offer): Observable<any> {
     
        return this.httpClient.post<any>(ApiService.updateActiveOffersURL, admin);
      }
}
