const { API_URL, NOMICS_API_KEY, CG_API_URL } = process.env;

export async function getCurrencyTicker(query) {
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
    `${API_URL}/currencies/ticker?key=${NOMICS_API_KEY}&ids=${ids}&interval=${interval}&convert=${convert}&status=${status}&filter=${filter}&platform-currency=${platformCurrency}&sort=${sort}&include-transparency=${includeTransparency}&page=${
      page || 1
    }&per_page=${perPage}`,
    requestOptions
  );
}

export async function getTrendingCurrencies() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/search/trending`, requestOptions);
}

export async function getGlobalCurrencyData() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/global`, requestOptions);
}
