import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import router from 'next/router';
import createEmotionCache from '../../utils/createEmotionCache';
import ThemeConfig from '../../theme/ThemeConfig';
import rootReducer from '../../redux/reducers/reducers';
import Layout from './layout';

const middleware = [thunkMiddleware];

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/user',
      pathname: '',
      query: { id: 7 },
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe('Layout', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
    const TestChild = function TestChild() {
      return <div>Test Child</div>;
    };
    const useRouter = jest.spyOn(router, 'useRouter');
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));

    /* Act */
    const wrapper = shallow(
      <Provider store={testStore}>
        <ThemeConfig emotionCache={createEmotionCache()}>
          <Layout>
            <TestChild />
          </Layout>
        </ThemeConfig>
      </Provider>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Elements', () => {
    it('Should render link to home page', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const TestChild = function TestChild() {
        return <div>Test Child</div>;
      };
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <Layout>
              <TestChild />
            </Layout>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      expect(wrapper.getByRole('link', { name: 'logo-image' })).toBeInTheDocument();
    });

    it('Should render passed children components', () => {
      /* Arrange */
      const testStore = createStore(rootReducer, {}, applyMiddleware(...middleware));
      const TestChild = function TestChild() {
        return <div>Test Child</div>;
      };
      const useRouter = jest.spyOn(router, 'useRouter');
      useRouter.mockImplementation(() => ({
        route: '/',
        pathname: '',
        query: '',
        asPath: '',
        push: jest.fn(),
        events: {
          on: jest.fn(),
          off: jest.fn(),
        },
        beforePopState: jest.fn(() => null),
        prefetch: jest.fn(() => null),
      }));

      /* Act */
      const wrapper = render(
        <Provider store={testStore}>
          <ThemeConfig emotionCache={createEmotionCache()}>
            <Layout>
              <TestChild />
            </Layout>
          </ThemeConfig>
        </Provider>
      );

      /* Assert */
      expect(wrapper.getByText('Test Child')).toBeInTheDocument();
    });
  });
});
