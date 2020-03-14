// React
import { Component } from 'react';


class ScrollToTopNavigation extends Component{
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}

export default ScrollToTopNavigation;