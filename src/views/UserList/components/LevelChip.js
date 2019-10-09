import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@material-ui/core';
import { LEVEL_ADMIN } from 'consts';

const LevelChip = props => {
  return (
    <Chip label={props.level === LEVEL_ADMIN ? 'Administrador' : 'Usuário'} />
  );
};

LevelChip.propTypes = {
  level: PropTypes.string,
};

export default LevelChip;
