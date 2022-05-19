import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import toJson from 'enzyme-to-json';
import createEmotionCache from '../utils/createEmotionCache';
import ThemeConfig from '../theme/ThemeConfig';
import Footer from './footer';

describe('Footer', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const wrapper = shallow(
      <ThemeConfig emotionCache={createEmotionCache()}>
        <Footer />
      </ThemeConfig>
    );

    /* Assert */
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('Copyright date', () => {
    it('Should render this year', () => {
      /* Arrange */
      const today = new Date();
      const date = today.getFullYear();

      /* Act */
      const wrapper = render(
        <ThemeConfig emotionCache={createEmotionCache()}>
          <Footer />
        </ThemeConfig>
      );

      /* Assert */
      expect(wrapper.getByText(date)).toBeInTheDocument();
    });
  });

  describe('Home link', () => {
    it('Should render link to homepage', () => {
      /* Arrange */
      const linkText = 'CryptoMe.io';
      const linkUrl = '/';

      /* Act */
      const wrapper = render(
        <ThemeConfig emotionCache={createEmotionCache()}>
          <Footer />
        </ThemeConfig>
      );

      /* Assert */
      expect(wrapper.getByText(linkText).closest('a')).toHaveAttribute('href', linkUrl);
    });
  });
});
