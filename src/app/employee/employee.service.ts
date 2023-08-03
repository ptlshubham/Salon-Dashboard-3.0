
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveEmployeeList(admin: Employee): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveEmployeeListURL, admin);
    }
    getAllEmployeeList(): Observable<Employee[]> {
        return this.httpClient.get<any>(ApiService.getAllEmployeeURL);
    }
    removeEmployeeList(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeEmployeeListURL, data);
    }
    updateEmpList(admin: Employee): Observable<any> {
        return this.httpClient.post<any>(ApiService.updateEmployeeListURL, admin);
    }
    updateEmpActiveStatus(admin:Employee):Observable<any>{
        return this.httpClient.post<any>(ApiService.updateWorkingStatusURL,admin)
    }

}
