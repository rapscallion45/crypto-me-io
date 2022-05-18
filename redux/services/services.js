function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    /* check if there's a response message from server */
    if (data.message) {
      return data && data.message;
    }
    return data;
  });
}

function getCurrencyTicker(query) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  const {
    ids,
    interval,
    convert,
    status,
    filter,
    platformCurrency,
    sort,
    includeTransparency,
    perPage,
    page,
  } = query;

  return fetch(
    `/api/currencies?ids=${ids}&interval=${interval}&convert=${convert}&status=${status}&filter=${filter}&platformCurrency=${platformCurrency}&sort=${sort}&includeTransparency=${includeTransparency}&page=${
      page || 1
    }&per_page=${perPage}`,
    requestOptions
  ).then(handleResponse);
}

function getAllCurrencies(page, perPage, localCurrency, order) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `/api/all-currencies?vs_currency=${localCurrency || 'usd'}&page=${page || 1}&perPage=${
      perPage || 50
    }&order=${order || 'market_cap_desc'}`,
    requestOptions
  ).then(handleResponse);
}

function getCurrencyById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/currency/${id}`, requestOptions).then(handleResponse);
}

function getTrendingCurrencies() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/trending`, requestOptions).then(handleResponse);
}

function getTopCurrencies(localCurrency) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/top?vs_currency=${localCurrency}`, requestOptions).then(handleResponse);
}

function getGlobalCurrencyData() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/global`, requestOptions).then(handleResponse);
}

function getMarketChartData(id, localCurrency, days, interval) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `/api/market-chart?id=${id}&vs_currency=${localCurrency}&days=${days}&interval=${interval}`,
    requestOptions
  ).then(handleResponse);
}

function search(query) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  };

  return fetch(`/api/search`, requestOptions).then(handleResponse);
}

function subscribeMailingList(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  };

  return fetch(`/api/subscribe`, requestOptions).then(handleResponse);
}

const services = {
  getCurrencyTicker,
  getAllCurrencies,
  getCurrencyById,
  getTopCurrencies,
  getTrendingCurrencies,
  getGlobalCurrencyData,
  getMarketChartData,
  search,
  subscribeMailingList,
};
export default services;
