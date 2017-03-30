import {actions} from './grid.actions';

export const gridReducer = (state = {}, action) => {
  switch (action.type) {
    case actions.CHANGE_PAGE:
      return changePage(state, action);
    case actions.CHANGE_ROWS:
      return changeRows(state, action);
    case actions.CHANGE_FILTERS:
      return changeFilters(state, action);
    default:
      return state;
  }
};

function changePage(state, action) {
  let gridState = state[action.gridId] || {};

  state[action.gridId] = {
    ...gridState,
    currentPage: action.currentPage,
    rowsOnPage: action.rowsOnPage
  };

  return {...state};
}

function changeRows(state, action) {
  let gridState = state[action.gridId] || {};

  state[action.gridId] = {
    ...gridState,
    newRows: action.newRows,
  };

  return {...state};
}

function changeFilters(state, action) {
  let gridState = state[action.gridId] || {};

  state[action.gridId] = {
    ...gridState,
    filters: action.filters,
  };

  return {...state};
}
