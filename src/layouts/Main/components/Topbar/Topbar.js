import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import GamepadIcon from '@material-ui/icons/Gamepad';
import Context from 'Context';
import { LEVEL_USER } from 'consts';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  logo: {
    height: 50,
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  gamepadIcon: {
    marginRight: theme.spacing(1)
  },
  linkButton: {
    color: 'inherit',
  },
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;
  const { user, selectedGame } = useContext(Context);

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            className={classes.logo}
            src="/images/logos/logo.png"
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        {user.level === LEVEL_USER && (
          <RouterLink
            className={classes.linkButton}
            to="/game-select"
          >
            <Button color="inherit">
              <GamepadIcon className={classes.gamepadIcon} />
              {selectedGame ? selectedGame.name : 'Selecionar jogo'}
            </Button>
          </RouterLink>
        )}
        <RouterLink
          className={classes.linkButton}
          to="/sair"
        >
          <IconButton
            className={classes.signOutButton}
            color="inherit"
          >
            <InputIcon />
          </IconButton>
        </RouterLink>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
