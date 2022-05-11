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

  return fetch(
    `${CG_API_URL}/coins/markets?vs_currency=usd&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`,
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
