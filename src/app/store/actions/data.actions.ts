import { createAction, props } from '@ngrx/store';

import { Transaction } from 'src/app/services/transactions.service';
import { Category } from 'src/app/services/categories.service';

export const ActionGetTransactions = createAction('GET TRANSACTIONS');

export const ActionSetTransactions = createAction(
  'SET TRANSACTIONS',
  props<{ data: Transaction[]}>()
);

export const ActionGetCategories = createAction('GET CATEGORIES');

export const ActionSetCategories = createAction(
  'SET CATEGORIES',
  props<{ data: Category[]}>()
);

export const ActionDataFetched = createAction('DATA FETCHED');
