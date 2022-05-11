import { createMocks } from 'node-mocks-http';
import getCurrencyTicker from '../pages/api/currencies';
import getGlobalCurrencyData from '../pages/api/global';
import getTrendingCurrencies from '../pages/api/trending';
import currencyTickerDataMock from '../__mocks__/currencyTickerDataMock';
import globalCurrencyDataMock from '../__mocks__/globalCurrencyDataMock';
import trendingCurrenciesDataMock from '../__mocks__/trendingCurrenciesDataMock';

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
});
