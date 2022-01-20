import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BankService } from 'src/app/service/bank.service';
import { Statement, Operation } from '../history/statement';

@Component({
  selector: 'operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.css']
})
export class OperationComponent implements OnInit {

  @Output() newOperation: EventEmitter<any> = new EventEmitter();

  balance: number = 0;
  amount: number = 10;
  operationType: any = [
    {
      name: "Deposit",
      value: Operation.DEPOSIT
    },
    {
      name: "Withdrawal",
      value: Operation.WITHDRAWAL
    }
  ];
  selectOperation: Operation = Operation.DEPOSIT;
  alert: boolean = false

  constructor(private bankService: BankService) { }

  ngOnInit(): void {
    this.getHistory()
  }

  getHistory(): void {
    this.bankService.getHistory()
      .subscribe(statements => this.balance = statements[statements.length-1].balance);
  }

  mewOperation(): void {
    if(!this.alert){
      let statement: Statement =  {
        date: formatDate(new Date(),'dd/MM/yyyy', 'en'),
        operation: this.selectOperation,
        amount: this.amount,
        balance: this.selectOperation == Operation.DEPOSIT ? this.balance + this.amount : this.balance - this.amount
      }; 
      this.bankService.makeOperation(statement).subscribe(
        statement => {
          this.newOperation.emit(statement);
          this.bankService.getHistory()
            .subscribe(statements => this.balance = statements[statements.length-1].balance);
        }     
      );
    } 
  }

 onAmountChange() {
    this.alert = this.amount <= 0
 }
}
