import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity';
import { ActionSetTransactions, ActionSetCategories, ActionDataFetched } from '../actions/data.actions';
import { Transaction } from 'src/app/services/transactions.service';
import { Category } from 'src/app/services/categories.service';

export interface DataState {
  rawTransactions: Transaction[];
  rawCategories: Category[];
  combinedTransactions: Transaction[];

  transactionEntities: BasicEntity<Transaction>;
  categoryEntities: BasicEntity<Category>;

  transactionNgrxEntity: EntityState<Transaction>;
  categoryNgrxEntity: EntityState<Category>;
}

interface BasicEntity<T> {
  ids: string[];
  entities: {[key: string]: T };
}

export const TransactionEntityAdapter: EntityAdapter<Transaction> = createEntityAdapter<Transaction>({
  selectId: (a: Transaction) => a.guid
});

export const CategoryEntityAdapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: (a: Category) => a.id
});

export const InitialDataState: DataState = {
  rawTransactions: [],
  rawCategories: [],
  combinedTransactions: [],

  transactionEntities: { ids: [], entities: {}},
  categoryEntities: { ids: [], entities: {}},

  transactionNgrxEntity: TransactionEntityAdapter.getInitialState(),
  categoryNgrxEntity: CategoryEntityAdapter.getInitialState(),
};

export const DataReducer = createReducer(
  InitialDataState,
  on(ActionSetTransactions, (state, {data}) => {
    return {
      ...state,
      rawTransactions: data
    };
  }),
  on(ActionSetCategories, (state, {data}) => {
    return {
      ...state,
      rawCategories: [...data]
    };
  }),
  on(ActionDataFetched, (state) => {
    return {
      ...state,
      combinedTransactions: state.rawTransactions.map((transaction) => {
        return {
          ...transaction,
          category: state.rawCategories.find((category) => {
            console.log(transaction.label, category.label);
            return category.id === transaction.category;
          }).label
        };
      })
    };
  }),

  //////////////////////////////////////////////////////////

  // on(ActionSetTransactions, (state, {data}) => {
  //   const newIds = [];
  //   const newEntities = {};

  //   data.forEach(transaction => {
  //     newIds.push(transaction.guid);
  //     newEntities[transaction.guid] = {
  //       guid: transaction.guid,
  //       label: transaction.label,
  //       category: transaction.category,
  //       amount: transaction.amount
  //     };
  //   });

  //   return {
  //     ...state,
  //     transactionEntities: {
  //       ids: newIds,
  //       entities: newEntities
  //     }
  //   };
  // }),
  // on(ActionSetCategories, (state, {data}) => {
  //   const newIds = [];
  //   const newEntities = {};

  //   data.forEach(category => {
  //     newIds.push(category.id);
  //     newEntities[category.id] = {
  //       id: category.id,
  //       label: category.label,
  //     };
  //   });

  //   return {
  //     ...state,
  //     categoryEntities: {
  //       ids: newIds,
  //       entities: newEntities
  //     }
  //   };
  // }),
  // on(ActionDataFetched, (state) => {
  //   return {
  //     ...state,
  //     combinedTransactions: state.transactionEntities.ids.map((transactionId) => {
  //       console.log(transactionId);

  //       return {
  //         ...state.transactionEntities.entities[transactionId],
  //         category: state.categoryEntities.entities[state.transactionEntities.entities[transactionId].category].label
  //       };
  //     })
  //   };
  // }),

  /////////////////////////////////////////////

  // on(ActionSetTransactions, (state, {data}) => {
  //   return {
  //     ...state,
  //     transactionNgrxEntity: TransactionEntityAdapter.addAll(data, state.transactionNgrxEntity)
  //   };
  // }),
  // on(ActionSetCategories, (state, {data}) => {
  //   return {
  //     ...state,
  //     categoryNgrxEntity: CategoryEntityAdapter.addAll(data, state.categoryNgrxEntity)
  //   };
  // }),
);
