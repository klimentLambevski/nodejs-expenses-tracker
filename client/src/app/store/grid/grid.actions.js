import {createActionMap} from '../action';

export const actions = createActionMap({
  CHANGE_PAGE: '',
  CHANGE_ROWS: '',
  CHANGE_FILTERS: '',
}, 'grid');

export const changePage = (gridId, currentPage, rowsOnPage) => ({
  type: actions.CHANGE_PAGE,
  gridId,
  currentPage,
  rowsOnPage,
});

export const changeRows = (gridId, newRows) => ({
  type: actions.CHANGE_ROWS,
  gridId,
  newRows,
});

export const changeFilters = (gridId, filters) => ({
  type: actions.CHANGE_FILTERS,
  gridId,
  filters,
});
