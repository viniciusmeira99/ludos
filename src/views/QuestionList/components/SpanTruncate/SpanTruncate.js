import React from 'react';
import PropTypes from 'prop-types';

const SpanTruncate = ({
  children,
  length,
}) => (
  <span title={children}>
    {`${children.substr(0, length)}${children.length > length ? '...' : ''}`}
  </span>
);

SpanTruncate.propTypes = {
  children: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
}

export default SpanTruncate;
