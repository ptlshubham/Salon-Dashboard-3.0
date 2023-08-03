
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Servicescustm } from './servicescustm.model';

@Injectable({
    providedIn: 'root'
})
export class ServicescustmService {

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllServicescustmList(): Observable<Servicescustm[]> {
        return this.httpClient.get<any>(ApiService.getAllServicesURL);
    }
    
}
