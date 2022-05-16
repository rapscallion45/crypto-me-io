import router from 'next/router';
import * as types from '../types/types';
import services from '../services/services';

function enqueueSnackbar(notification) {
  const key = notification.options && notification.options.key;

  return {
    type: types.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
}

function closeSnackbar(key) {
  return {
    type: types.CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  };
}

function removeSnackbar(key) {
  return {
    type: types.REMOVE_SNACKBAR,
    key,
  };
}

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

/* Get currency data by ID from endpoint */
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

/* Get latest global currency data from endpoint */
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

/* Search for currency data from endpoint */
function search(query) {
  function request(term) {
    router.push('/search');
    return { type: types.SEARCH_REQUEST, term };
  }
  function success(searchData, term) {
    return { type: types.SEARCH_SUCCESS, searchData, term };
  }
  function failure(error) {
    return { type: types.SEARCH_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request(query));

    services.search(query).then(
      (data) => dispatch(success(data, query)),
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
}

/* Update the local currency setting for app */
function updateLocalCurrency(currency) {
  return { type: types.UPDATELOCALCURRENCY, currency };
}

/* Mailing list subscribe */
function subscribeMailingList(email) {
  function request() {
    return { type: types.MAILINGLISTSUBSCRIBE_REQUEST };
  }
  function success() {
    return { type: types.MAILINGLISTSUBSCRIBE_SUCCESS };
  }
  function failure(error) {
    return { type: types.MAILINGLISTSUBSCRIBE_FAILURE, error };
  }

  return (dispatch) => {
    dispatch(request());

    services.subscribeMailingList(email).then(
      (data) => {
        dispatch(success(data));
        dispatch(
          enqueueSnackbar({
            message: 'Thanks, your email has been added to our mailing list!',
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'success',
            },
          })
        );
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(
          enqueueSnackbar({
            message: error,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: 'error',
            },
          })
        );
      }
    );
  };
}

const currencyActions = {
  enqueueSnackbar,
  closeSnackbar,
  removeSnackbar,
  getCurrencyTicker,
  getAllCurrencies,
  getCurrencyById,
  getTrendingCurrencies,
  getGlobalCurrencyData,
  search,
  updateLocalCurrency,
  subscribeMailingList,
};
export default currencyActions;
