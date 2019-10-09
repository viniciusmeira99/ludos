import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const BackButton = ({
  history,
}) => {
  return (
    <Button
      color="secondary"
      onClick={history.goBack}
      variant="contained"
    >
      Voltar
    </Button>
  );
};

BackButton.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired
};

export default withRouter(BackButton);
