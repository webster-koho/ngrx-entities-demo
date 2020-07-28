import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DataState, TransactionEntityAdapter, CategoryEntityAdapter } from '../reducers/data.reducer';


export const SelectDataFeature = createFeatureSelector<DataState>('data');

export const SelectRawTransactions = createSelector(
  SelectDataFeature,
  (state) => state.rawTransactions
);

export const SelectRawCategories = createSelector(
  SelectDataFeature,
  (state) => state.rawCategories
);

export const SelectTransactionCombined = createSelector(
  SelectDataFeature,
  (state) => state.combinedTransactions
);

/////////////////////////////////////////////////

export const SelectTransactions = createSelector(
  SelectDataFeature,
  (state) => state.transactionEntities
);

export const SelectCategories = createSelector(
  SelectDataFeature,
  (state) => state.categoryEntities
);

///////////////////////////////////////////////

export const SelectAllTransactions = createSelector(
  SelectDataFeature,
  state => TransactionEntityAdapter.getSelectors().selectAll(state.transactionNgrxEntity)
);

export const SelectAllCategories = createSelector(
  SelectDataFeature,
  state => CategoryEntityAdapter.getSelectors().selectAll(state.categoryNgrxEntity)
);

export const SelectCategoryEntities = createSelector(
  SelectDataFeature,
  state => CategoryEntityAdapter.getSelectors().selectEntities(state.categoryNgrxEntity)
);
