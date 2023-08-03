
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Salary } from './salary.model';

@Injectable({
    providedIn: 'root'
})
export class SalaryService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllSalaryList(id): Observable<Salary[]> {
        let data = {
            id: id
        }
         
        return this.httpClient.post<any>(ApiService.getAllSalaryListURL, data);
    }
    removeSalaryList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeSalaryListURL, data);
    }
    updateActiveStatusList(admin: Salary): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateSalaryStatusURL, admin);
    }
    updateSalaryList(admin: Salary): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateSalaryListURL, admin);
    }
    saveSalaryList(admin: Salary): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveSalaryListURL, admin);
    }

}
