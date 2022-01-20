export interface Statement {
  id?: number;
  date: string;
  operation: Operation;
  amount: number;
  balance: number;
}

export enum Operation {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL'
}