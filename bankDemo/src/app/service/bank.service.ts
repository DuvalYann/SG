import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Statement } from '../container/history/statement';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  private url = 'api/'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getHistory(): Observable<Statement[]> {
    return this.http.get<Statement[]>(this.url + 'statement')
      .pipe(
        catchError(this.handleError<Statement[]>('getHistory', []))
      );
  }

  makeOperation(statement: Statement): Observable<any> {
    return this.http.post<Statement>(this.url + 'statement', statement, this.httpOptions)
      .pipe(
        catchError(this.handleError<Statement>('makeDeposit'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
