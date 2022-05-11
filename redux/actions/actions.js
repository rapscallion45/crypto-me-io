import * as types from '../types/types';
import services from '../services/services';

/* Get currency ticker data from endpoint */
function getCurrencyTicker(query) {
  function request() {
    return { type: types.GETCURRENCYTICKER_REQUEST };
  }
  function success(currencyTickerData) {
    return { type: types.GETCURRENCYTICKER_SUCCESS, currencyTickerData };
  }
  function failure(error) {
    return { type: types.GETCURRENCYTICKER_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getCurrencyTicker(query).then(
      (data) => dispatch(success(data)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Get latest trending currency data from endpoint */
function getTrendingCurrencies() {
  function request() {
    return { type: types.GETTRENDINGCURRENCIES_REQUEST };
  }
  function success(trendingCurrencies) {
    return { type: types.GETTRENDINGCURRENCIES_SUCCESS, trendingCurrencies };
  }
  function failure(error) {
    return { type: types.GETTRENDINGCURRENCIES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getTrendingCurrencies().then(
      (data) => dispatch(success(data)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Get latest trending currency data from endpoint */
function getGlobalCurrencyData() {
  function request() {
    return { type: types.GLOBALCURRENCYDATA_REQUEST };
  }
  function success(globalCurrencyData) {
    return { type: types.GLOBALCURRENCYDATA_SUCCESS, globalCurrencyData };
  }
  function failure(error) {
    return { type: types.GLOBALCURRENCYDATA_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getGlobalCurrencyData().then(
      (data) => dispatch(success(data)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

const currencyActions = {
  getCurrencyTicker,
  getTrendingCurrencies,
  getGlobalCurrencyData,
};
export default currencyActions;
