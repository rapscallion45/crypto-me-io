import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import createEmotionCache from '../../utils/createEmotionCache';
import ThemeConfig from '../../theme/ThemeConfig';
import BaseOptionChartStyle from './base-option-chart-style';

describe('Charts Base Options', () => {
  it('Renders correctly enzyme', () => {
    /* Arrange */
    /* Act */
    const view = render(
      <ThemeConfig emotionCache={createEmotionCache()}>
        <BaseOptionChartStyle />
      </ThemeConfig>
    );

    /* Assert */
    expect(toJson(view)).toMatchSnapshot();
  });
});
