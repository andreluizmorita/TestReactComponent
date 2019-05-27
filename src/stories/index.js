import React from 'react';

import { storiesOf, addParameters } from '@storybook/react';
import App from '../App'

storiesOf('Carousel', module)
  .addParameters({ options: { isFullscreen: 'true' } })
  .add('Carousel Component', () => (
    <App />
  ))