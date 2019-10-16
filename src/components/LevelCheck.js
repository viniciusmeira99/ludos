import { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from 'Context';

const LevelCheck = props => {
  const { user } = useContext(Context);

  if (!user || user.level !== props.level) {
    return null;
  }

  return props.children;
};

LevelCheck.propTypes = {
  children: PropTypes.node,
  level: PropTypes.string,
};

export default LevelCheck;
