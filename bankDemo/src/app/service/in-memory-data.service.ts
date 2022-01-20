import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Statement, Operation } from '../container/history/statement';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const statement = [
      { id: 0, operation: Operation.DEPOSIT, date: '19/01/2022', amount: 200, balance: 200 },
      { id: 1, operation: Operation.WITHDRAWAL, date: '19/01/2022', amount: 100, balance: 100 },
      { id: 2, operation: Operation.DEPOSIT, date: '19/01/2022',amount: 300, balance: 400 },
      { id: 3, operation: Operation.DEPOSIT, date: '19/01/2022',amount: 25, balance: 425 },
      { id: 4, operation: Operation.DEPOSIT, date: '19/01/2022',amount: 50, balance: 475 },
      { id: 5, operation: Operation.WITHDRAWAL, date: '19/01/2022', amount: 100, balance: 375 },
      { id: 6, operation: Operation.DEPOSIT, date: '19/01/2022',amount: 50, balance: 425 },
      { id: 7, operation: Operation.DEPOSIT, date: '19/01/2022', amount: 800, balance: 1225 },
      { id: 8, operation: Operation.WITHDRAWAL, date: '19/01/2022', amount: 200, balance: 1025 }
    ]; 
    return {statement}; 
  }
}