
import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

const AnswerIcon = ({
  isCorrect,
}) => {
  if (isCorrect) {
    return <CheckIcon color="primary" />;
  }

  return <CloseIcon color="error" />;
};

AnswerIcon.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
};

export default AnswerIcon;
