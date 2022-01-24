import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectStock =
  createFeatureSelector<ReadonlyArray<any>>('stock');


