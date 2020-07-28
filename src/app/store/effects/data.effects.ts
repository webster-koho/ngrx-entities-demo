import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, catchError, switchMap, endWith } from 'rxjs/operators';

import { ActionGetTransactions, ActionSetTransactions, ActionGetCategories, ActionSetCategories, ActionDataFetched } from '../actions/data.actions';
import { TransactionsService } from 'src/app/services/transactions.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Injectable()
export class DataEffects {

  constructor(
    private actions$: Actions,
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
  ) {}

  loadTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(ActionGetTransactions),
    switchMap(
      (action) => this.transactionsService.getTransactions().pipe(
        map((data) => ActionSetTransactions({data})),
        catchError(() => EMPTY)
      )
    )
  ));

  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(ActionGetCategories),
    switchMap(
      (action) => this.categoriesService.getCategories().pipe(
        map((data) => ActionSetCategories({data})),
        catchError(() => EMPTY),
        endWith(ActionDataFetched())
      )
    )
  ));

}
