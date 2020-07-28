import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActionGetCategories, ActionGetTransactions } from './store/actions/data.actions';
import {
  SelectRawTransactions,
  SelectRawCategories,
  SelectTransactionCombined,
  SelectTransactions,
  SelectCategories,
  SelectAllTransactions,
  SelectAllCategories,
  SelectCategoryEntities
} from './store/selectors/data.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rawTransactions$ = this.store.select(SelectRawTransactions);
  rawCategories$ = this.store.select(SelectRawCategories);
  transactionCombined$ = this.store.select(SelectTransactionCombined);

  transactions$ = this.store.select(SelectTransactions);
  categories$ = this.store.select(SelectCategories);

  allTransactions$ = this.store.select(SelectAllTransactions);
  allCategories$ = this.store.select(SelectAllCategories);
  categoryEntities$ = this.store.select(SelectCategoryEntities);

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.store.dispatch(ActionGetTransactions());
    this.store.dispatch(ActionGetCategories());
  }
}
