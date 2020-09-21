import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const Spacer = (props) => {
  const {height} = props;

  const newProps = {
    style: {height: height ? height : 16},
  };

  return React.createElement(View, newProps);
};

Spacer.propTypes = {
  height: PropTypes.number,
};

export default Spacer;
