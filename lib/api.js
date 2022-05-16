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

export async function getAllCurrencies(query) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `${CG_API_URL}/coins/markets?vs_currency=${
      query.vs_currency
    }&order=market_cap_desc&per_page=50&page=${
      query.page || 1
    }&sparkline=false&price_change_percentage=1h%2C%2024h%2C7d%2C30d`,
    requestOptions
  );
}

export async function getCurrencyById(id) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/coins/${id}`, requestOptions);
}

export async function getTrendingCurrencies() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/search/trending`, requestOptions);
}

export async function getTopCurrencies(query) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(
    `${CG_API_URL}/coins/markets?vs_currency=${query.vs_currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
    requestOptions
  );
}

export async function getGlobalCurrencyData() {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/global`, requestOptions);
}

export async function search(query) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };

  return fetch(`${CG_API_URL}/search?query=${query}`, requestOptions);
}

export async function subscribeMailingList(email) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: 'testtest' }),
  };

  return fetch(`https://reqres.in/api/users`, requestOptions);
}
