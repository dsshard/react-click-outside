import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ReactClickOutside extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
  }

  componentDidMount() {
    window.document.addEventListener('click', this.handleClickOutside, true);
    window.document.addEventListener('keydown', this.handleEsc, true);
  }


  componentWillUnmount() {
    window.document.removeEventListener('click', this.handleClickOutside, true);
    window.document.addEventListener('keydown', this.handleEsc, true);
    if (this.node) {
      this.node = null;
    }
  }

  onRef = (node) => {
    if (!this.node && node) {
      this.node = node;
    }
  }

  handleEsc = ({ keyCode }) => {
    const { visible, onClose } = this.props;
    if (keyCode === 27 && visible) {
      onClose();
    }
  }


  handleClickOutside = (event) => {
    const { visible, onClose } = this.props;
    if (!this.node || !this.node.contains(event.target)) {
      if (event.type === 'touchend') this.isTouch = true;
      if (event.type === 'click' && this.isTouch) return;

      if (visible) {
        setTimeout(() => {
          if (visible) { onClose(); }
        });
      }
    }
  }

  render() {
    const { visible, children } = this.props;
    if (!visible) {
      return null;
    }
    return React.Children.map(children, child => React.cloneElement(child, {
      ref: (ref) => { this.node = ref; },
    }));
  }
}
