/**
 * Shared mock server API handlers shared between all tests
 */
import { rest } from 'msw';
import currencyTickerDataMock from './currencyTickerDataMock';
import globalCurrencyDataMock from './globalCurrencyDataMock';
import trendingCurrenciesDataMock from './trendingCurrenciesDataMock';
import currencyDataMock from './currencyDataMock';
import allCurrenciesDataMock from './allCurrenciesDataMock';

const { API_URL, CG_API_URL } = process.env;

const serverMockHandlers = [
  /* ****************** */
  /* NEXT API MOCKS     */
  /* ****************** */

  /* Test/mock get currency ticker data */
  rest.get('/api/currencies', async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(currencyTickerDataMock))
  ),
  /* Test/mock get all currency data */
  rest.get('/api/all-currencies', async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(allCurrenciesDataMock))
  ),
  /* Test/mock get currency data by ID */
  rest.get(`/api/currency/:id`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(currencyDataMock))
  ),
  /* Test/mock get trending currency data */
  rest.get('/api/trending', async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(trendingCurrenciesDataMock))
  ),
  /* Test/mock get global currency data */
  rest.get('/api/global', async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(globalCurrencyDataMock))
  ),

  /* ****************** */
  /* EXTERNAL API MOCKS */
  /* ****************** */

  /* Test/mock get currency ticker data */
  rest.get(`${API_URL}/currencies/ticker`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(currencyTickerDataMock))
  ),
  /* Test/mock get all currency data */
  rest.get(`${CG_API_URL}/coins/markets`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(allCurrenciesDataMock))
  ),
  /* Test/mock get currency data by ID */
  rest.get(`${CG_API_URL}/coins/:id`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(currencyDataMock))
  ),
  /* Test/mock get trending currency data */
  rest.get(`${CG_API_URL}/search/trending`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(trendingCurrenciesDataMock))
  ),
  /* Test/mock get global currency data */
  rest.get(`${CG_API_URL}/global`, async (req, res, ctx) =>
    res(ctx.status(200), ctx.json(globalCurrencyDataMock))
  ),
];

/* eslint-disable import/prefer-default-export */
export { serverMockHandlers };
