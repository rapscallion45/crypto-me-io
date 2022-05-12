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

function getAllCurrencies() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/all-currencies`, requestOptions).then(handleResponse);
}

function getTrendingCurrencies() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/trending`, requestOptions).then(handleResponse);
}

function getGlobalCurrencyData() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`/api/global`, requestOptions).then(handleResponse);
}

const services = {
  getCurrencyTicker,
  getAllCurrencies,
  getTrendingCurrencies,
  getGlobalCurrencyData,
};
export default services;
