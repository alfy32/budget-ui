import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Transaction } from "./transaction";
import { Budget } from "./budget";

@Injectable({ providedIn: 'root' })
export class TransactionService {

    constructor(
        private http: HttpClient
    ) { }

    getTransactions(needsCategorized: boolean): Observable<Transaction[]> {
        return this.http.get<Transaction[]>('/rest/transactions', {
            params: { needsCategorized: !!needsCategorized }
        });
    }

    getTransaction(transactionId: number): Observable<Transaction> {
        return this.http.get<Transaction>('/rest/transactions/' + transactionId);
    }

    getTransactionDescription(transactionId: number): Observable<any> {
        return this.http.get<any>('/rest/transactions/' + transactionId + '/description');
    }

    setTransactionDescription(transactionId: number, description: string): Observable<Object> {
        const formData = new URLSearchParams();
        formData.set('description', description);
        return this.http.post(
            '/rest/transactions/' + transactionId + '/description',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
    }

    setTransactionCategory(transactionId: number, category: string): Observable<void> {
        const formData = new URLSearchParams();
        formData.set('category', category);
        return this.http.post<void>(
            '/rest/transactions/' + transactionId + '/category',
            formData.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )
    }

    setTransactionTags(transactionId: number, tags: string[]): Observable<void> {
        return this.http.post<void>(
            '/rest/transactions/' + transactionId + '/tags',
            tags  
        )
    }

    setTransactionNotes(transactionId: number, notes: string): Observable<void> {
        return this.http.post<void>(
            '/rest/transactions/' + transactionId + '/notes',
            notes  
        )
    }

    getBudgets(date: Date): Observable<Budget[]> {
        const dateString = date.toISOString().split('T')[0];
        return this.http.get<Budget[]>('/rest/budgets?date=' + dateString);
    }

}