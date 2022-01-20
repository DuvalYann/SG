import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperationComponent } from './container/operation/operation.component';
import { HistoryComponent } from './container/history/history.component';

const routes: Routes = [
  { path: 'operation', component: OperationComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
