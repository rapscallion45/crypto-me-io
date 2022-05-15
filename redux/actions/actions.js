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

/* Get all currency data from endpoint */
function getAllCurrencies(page, localCurrency) {
  function request() {
    return { type: types.GETALLCURRENCIES_REQUEST };
  }
  function success(allCurrencies) {
    return { type: types.GETALLCURRENCIES_SUCCESS, allCurrencies };
  }
  function failure(error) {
    return { type: types.GETALLCURRENCIES_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getAllCurrencies(page, localCurrency).then(
      (data) => dispatch(success(data)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Get all currency data from endpoint */
function getCurrencyById(id) {
  function request() {
    return { type: types.GETCURRENCYDATABYID_REQUEST };
  }
  function success(currencyData) {
    return { type: types.GETCURRENCYDATABYID_SUCCESS, currencyData };
  }
  function failure(error) {
    return { type: types.GETCURRENCYDATABYID_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.getCurrencyById(id).then(
      (data) => dispatch(success(data)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Get latest trending currency data from endpoint */
function getTrendingCurrencies(localCurrency) {
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

    services.getTrendingCurrencies(localCurrency).then(
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

/* Get latest trending currency data from endpoint */
function updateLocalCurrency(currency) {
  return { type: types.UPDATELOCALCURRENCY, currency };
}

const currencyActions = {
  getCurrencyTicker,
  getAllCurrencies,
  getCurrencyById,
  getTrendingCurrencies,
  getGlobalCurrencyData,
  updateLocalCurrency,
};
export default currencyActions;
