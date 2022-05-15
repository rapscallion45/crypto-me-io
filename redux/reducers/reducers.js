import { combineReducers } from 'redux';
import * as types from '../types/types';

// CURRENCY TICKER REDUCER
const currencyTickerReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETCURRENCYTICKER_REQUEST:
      return {
        loading: true,
      };
    case types.GETCURRENCYTICKER_SUCCESS:
      return {
        data: action.currencyTickerData,
        loaded: true,
      };
    case types.GETCURRENCYTICKER_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// ALL CURRENCIES REDUCER
const allCurrenciesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETALLCURRENCIES_REQUEST:
      return {
        loading: true,
      };
    case types.GETALLCURRENCIES_SUCCESS:
      return {
        data: action.allCurrencies,
        loaded: true,
      };
    case types.GETALLCURRENCIES_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// CURRENCY DATA REDUCER
const currencyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETCURRENCYDATABYID_REQUEST:
      return {
        loading: true,
      };
    case types.GETCURRENCYDATABYID_SUCCESS:
      return {
        data: action.currencyData,
        loaded: true,
      };
    case types.GETCURRENCYDATABYID_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// TRENDING CURRENCIES REDUCER
const trendingCurrenciesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GETTRENDINGCURRENCIES_REQUEST:
      return {
        loading: true,
      };
    case types.GETTRENDINGCURRENCIES_SUCCESS:
      return {
        data: action.trendingCurrencies,
        loaded: true,
      };
    case types.GETTRENDINGCURRENCIES_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// GLOBAL CURRENCY DATA REDUCER
const globalCurrencyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GLOBALCURRENCYDATA_REQUEST:
      return {
        loading: true,
      };
    case types.GLOBALCURRENCYDATA_SUCCESS:
      return {
        data: action.globalCurrencyData.data,
        loaded: true,
      };
    case types.GLOBALCURRENCYDATA_FAILURE:
      return {
        error: action.error,
        loaded: false,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  currencyTicker: currencyTickerReducer,
  allCurrencies: allCurrenciesReducer,
  currencyData: currencyDataReducer,
  trendingCurrencies: trendingCurrenciesReducer,
  globalCurrencyData: globalCurrencyDataReducer,
};

export default combineReducers(reducers);
