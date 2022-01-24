import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Operation, Statement } from '../container/history/statement';

import { BankService } from './bank.service';

describe('BankService', () => {
  let bankService: BankService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient',['get','post']);
    bankService = new BankService(httpClientSpy);
  })

  it('should return operation history', (done: DoneFn) => {
    const expectedHistory: Statement[] = [
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

    httpClientSpy.get.and.returnValue(of(expectedHistory));

    bankService.getHistory().subscribe({
      next : (statements) => {
        expect(statements.length).withContext('expected get history to return at least one statement').toBeGreaterThan(0);
        expect(statements).withContext('expected history').toEqual(expectedHistory);
        done();
      },
      error: (error) => done.fail(error)
    }
    );
   
    expect(httpClientSpy.get.calls.count()).withContext('one call').toBe(1)
  })

  it('should create new operation', (done: DoneFn) => {
    const newStatement: Statement = 
      { id: 9, operation: Operation.DEPOSIT, date: '19/01/2022', amount: 10, balance: 1035 }
    ;

    httpClientSpy.post.and.returnValue(of(newStatement));

    bankService.makeOperation(newStatement).subscribe({
      next : (statement) => {
        expect(statement).withContext('expected statement').toEqual(newStatement);
        done();
      },
      error: (error) => done.fail(error)
    })
  })
});
