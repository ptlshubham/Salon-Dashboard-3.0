
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Appointment } from './membershipappointment.model';
import { Membership } from './membership.model';
import { Purchased } from './purchsed-membership/purchased.model';


@Injectable({
    providedIn: 'root'
})
export class MembershipService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveMembershipList(admin: Membership): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveMembershipListURL, admin);
    }
    getAllMembershipList(): Observable<Membership[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipURL);
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
    getAllMemberPurchased(): Observable<Purchased[]> {
        return this.httpClient.get<any>(ApiService.getAllMembershipPurchasedURL);
    }

    updateMembershipList(admin: Membership): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateMembershipListURL, admin);
    }
    removeMembershipDetails(id) {
        return this.httpClient.get<any>(ApiService.removeMembershipDetailsURL + id);
    }


    getMemberServicesUsingId(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.getUsedServicesByMembershipURL, data);
    }
    savePurchaseServiceList(admin: Purchased): Observable<any> {
        return this.httpClient.post<any>(ApiService.savePurchaseServiceListURL, admin);
    }
    getPurchasedDetail(data): Observable<any> {
        return this.httpClient.post<any>(ApiService.getMembershipPurchasedByIDURL, data);
    }
}
