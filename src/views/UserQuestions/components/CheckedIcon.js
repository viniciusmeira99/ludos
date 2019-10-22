
import React from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
  },
}));

const CheckedIcon = ({
  answer,
  isCorrect,
  alternativeId,
}) => {
  const classes = useStyles();

  let icon = <RadioButtonUncheckedIcon />

  if (isCorrect) {
    icon = <CheckIcon color="primary" />;
  }

  if (answer.alternativeId === alternativeId && !isCorrect) {
    icon = <CloseIcon color="error" />;
  }

  return (
    <div className={classes.root}>
      {icon}
    </div>
  );
};

CheckedIcon.propTypes = {
  alternativeId: PropTypes.number.isRequired,
  answer: PropTypes.shape({
    alternativeId: PropTypes.number.isRequired,
  }).isRequired,
  isCorrect: PropTypes.bool.isRequired,
};

export default CheckedIcon;
