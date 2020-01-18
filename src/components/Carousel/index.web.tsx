import React, { Component } from 'react';
import SnapCarousel, { CarouselProperties } from 'react-native-snap-carousel';

/**
 *
 */
class Carousel<T> extends Component<CarouselProperties<T>> {
  componentDidMount() {
    this._addMouseSupport();
  }

  render() {
    const { ref, ...otherProps } = this.props;
    return <SnapCarousel nativeID='carousel' {...otherProps} />;
  }

  /**
   *
   */
  private _addMouseSupport() {
    const carousels = document.querySelectorAll('#carousel') as NodeListOf<HTMLElement>;
    carousels.forEach((el) => {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      el.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - el.offsetLeft;
        scrollLeft = el.scrollLeft;
      });
      el.addEventListener('mouseleave', () => (isDown = false));
      el.addEventListener('mouseup', () => (isDown = false));
      el.addEventListener('mousemove', (e) => {
        if (!isDown) {
          return;
        }
        e.preventDefault();
        const x = e.pageX - el.offsetLeft;
        const walk = x - startX;
        el.scrollLeft = scrollLeft - walk;
      });
    });
  }
}

export default Carousel;
