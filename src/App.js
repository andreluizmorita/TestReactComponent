import React from 'react';
import Carousel from './components/Carousel'

import image1 from './images/1.jpeg'
import image2 from './images/2.jpeg'
import image3 from './images/3.jpeg'
import image4 from './images/4.jpeg'
import image5 from './images/5.jpeg'
import image6 from './images/6.jpeg'

function App() {
  return (
    <div
      data-testid="testCarouselContainer"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      <Carousel>
        <img data-testid="Image1" src={image1} />
        <img data-testid="Image2" src={image2} />
        <img data-testid="Image3" src={image3} />
        <img data-testid="Image4" src={image4} />
        <img data-testid="Image5" src={image5} />
        <img data-testid="Image6" src={image6} />
      </Carousel>
    </div>
  )
}

export default App;
