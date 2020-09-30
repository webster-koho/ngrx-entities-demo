import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TransactionData } from './transactions.data';

export interface Transaction {
  guid: string;
  category: string;
  label: string;
  amount: string;
}


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor() { }

  getTransactions() {
    const response = new Subject<Transaction[]>();

    setTimeout(() => {
      response.next(TransactionData);
      response.complete();
    }, 500);

    return response;
  }
}
