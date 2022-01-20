import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bankDemo';
  isNewOperation: boolean = false;

  constructor() {}

  newOperation(value: any): void {
    this.isNewOperation = value
  }
}
