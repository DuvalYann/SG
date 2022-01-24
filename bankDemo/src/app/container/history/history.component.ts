import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BankService } from 'src/app/service/bank.service';
import { Statement } from './statement';

import jsPDF from 'jspdf';
import  * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as pdfMake from 'pdfmake/build/pdfmake';
import htmlToPdfmake from 'html-to-pdfmake';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnChanges {

  @ViewChild('history')
  history!: ElementRef;
  @Input() newOperation: any;
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
            return -1;
          }
          return 0;
        })
      })
  }

  
  
  public downloadAsPDF() {
    const doc = new jsPDF();
   
    const pdfTable = this.history.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).open(); 
     
  }
}


