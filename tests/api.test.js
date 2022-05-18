import { createMocks } from 'node-mocks-http';
import getCurrencyTicker from '../pages/api/currencies';
import getGlobalCurrencyData from '../pages/api/global';
import getTrendingCurrencies from '../pages/api/trending';
import getTopCurrencies from '../pages/api/top';
import getCurrencyById from '../pages/api/currency/[id]';
import getAllCurrenciesData from '../pages/api/all-currencies';
import getMarketChartData from '../pages/api/market-chart';
import search from '../pages/api/search';
import subscribe from '../pages/api/subscribe';
import currencyTickerDataMock from '../__mocks__/currencyTickerDataMock';
import globalCurrencyDataMock from '../__mocks__/globalCurrencyDataMock';
import trendingCurrenciesDataMock from '../__mocks__/trendingCurrenciesDataMock';
import currencyDataMock from '../__mocks__/currencyDataMock';
import allCurrenciesDataMock from '../__mocks__/allCurrenciesDataMock';
import searchDataMock from '../__mocks__/searchDataMock';
import marketChartDataMock from '../__mocks__/marketChartDataMock';

/* eslint-disable no-underscore-dangle */
const { NOMICS_API_KEY } = process.env;

describe('API Routes', () => {
  describe('GET /api/currencies', () => {
    it('returns expected currency data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          key: NOMICS_API_KEY,
          ids: 'BTC,ETH,XRP',
          interval: '1d,30d',
          convert: 'EUR',
          'platform- currency': 'ETH',
          'per-page': '100',
          page: '1',
        },
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(currencyTickerDataMock));
    });
  });

  describe('GET /api/all-currencies', () => {
    it('returns expected global data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getAllCurrenciesData(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(allCurrenciesDataMock));
    });
  });

  describe('GET /api/currency/:id', () => {
    it('returns expected global data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        params: {
          id: 'bitcoin',
        },
      });

      await getCurrencyById(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(currencyDataMock));
    });
  });

  describe('GET /api/top', () => {
    it('returns expected top currencies data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getTopCurrencies(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(allCurrenciesDataMock));
    });
  });

  describe('GET /api/trending', () => {
    it('returns expected trending data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getTrendingCurrencies(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining(trendingCurrenciesDataMock)
      );
    });
  });

  describe('GET /api/global', () => {
    it('returns expected global data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getGlobalCurrencyData(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(globalCurrencyDataMock));
    });
  });

  describe('GET /api/market-chart', () => {
    it('returns expected global data', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });

      await getMarketChartData(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(marketChartDataMock));
    });
  });

  describe('POST /api/search', () => {
    it('returns expected global data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          query: 'bitcoin',
        },
      });

      await search(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(expect.objectContaining(searchDataMock));
    });
  });

  describe('POST /api/subscribe', () => {
    it('returns expected search result data', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          email: 'test@test.com',
        },
      });

      await subscribe(req, res);

      expect(res._getStatusCode()).toBe(200);
    });
  });

  describe('POST /api/currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/all-currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/all-currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/all-currencies', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /api/search', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/search', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/search', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/global', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/global', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/global', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/top', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getTopCurrencies(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/top', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getTopCurrencies(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/top', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getTopCurrencies(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/trending', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/trending', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/trending', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getCurrencyTicker(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('POST /api/market-chart', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'POST',
      });

      await getMarketChartData(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/market-chart', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
      });

      await getMarketChartData(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/market-chart', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
      });

      await getMarketChartData(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('GET /api/subscribe', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        body: {
          email: 'test@test.com',
        },
      });

      await subscribe(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('DELETE /api/subscribe', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        body: {
          email: 'test@test.com',
        },
      });

      await subscribe(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });

  describe('PUT /api/subscribe', () => {
    it('returns 404 for unsupported method', async () => {
      const { req, res } = createMocks({
        method: 'PUT',
        body: {
          email: 'test@test.com',
        },
      });

      await subscribe(req, res);

      expect(res._getStatusCode()).toBe(404);
    });
  });
});
