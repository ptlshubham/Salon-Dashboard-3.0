
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Observable } from 'rxjs';
import { Expenses } from './expenses.model';

@Injectable({
    providedIn: 'root'
})
export class ExpensesService {

    constructor(
        private httpClient: HttpClient
    ) { }

    saveExpensesList(admin: Expenses): Observable<any> {
        return this.httpClient.post<any>(ApiService.saveExpensesListURL, admin);
    }
    getAllExpensesList(): Observable<Expenses[]> {
        return this.httpClient.get<any>(ApiService.getAllExpensesURL);
    }
    removeExpensesDetails(id) {
        let data = {
            id: id
        }
        return this.httpClient.post<any>(ApiService.removeexpensesDetailsURL, data);
    }
    updateExpensesList(admin: Expenses): Observable<any> {
        console.log(admin,"updateservices")
        return this.httpClient.post<any>(ApiService.updateExpensesDetailsURL, admin);
    }
    getMonthlyExpensesList(): Observable<Expenses[]> {
        return this.httpClient.get<any>(ApiService.getMonthlyExpensesURL);
    }
}
