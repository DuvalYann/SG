import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BankService } from 'src/app/service/bank.service';
import { Statement } from './statement';

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnChanges {

  @Input() newOperation: any
  statements: Statement[] = [];


  constructor(private bankService: BankService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newOperation']) {
      this.getHistory();
    }
  }

  ngOnInit(): void {
    this.getHistory();
  }

  getHistory(): void {
    this.bankService.getHistory()
      .subscribe(statements => {
        this.statements = statements.sort( (a:any ,b: any) => {
          if(a.id < b.id) {
            return 1;
          }
          if(a.id > b.id) {
            return -1
          }
          return 0;
        })
      })
  }
}