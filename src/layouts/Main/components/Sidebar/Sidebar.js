import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import QuestionIcon from '@material-ui/icons/QuestionAnswer'
import ActionIcon from '@material-ui/icons/Assignment'

import { Profile, SidebarNav } from './components';
import Context from 'Context';
import { LEVEL_ADMIN } from 'consts';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;
  const { user } = useContext(Context);

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <DashboardIcon />,
      devel: false,
    },
    user.level === LEVEL_ADMIN && {
      title: 'Usuários',
      href: '/users',
      icon: <PeopleIcon />,
      devel: false,
    },
    user.level === LEVEL_ADMIN && {
      title: 'Jogos',
      href: '/games',
      icon: <GamepadIcon />,
      devel: false,
    },
    user.level === LEVEL_ADMIN && {
      title: 'Perguntas',
      href: '/questions',
      icon: <QuestionIcon />,
      devel: false,
    },
    user.level === LEVEL_ADMIN && {
      title: 'Ações',
      href: '/actions',
      icon: <ActionIcon />,
      devel: false,
    },
    {
      title: 'Produtos',
      href: '/products',
      icon: <ShoppingBasketIcon />,
      devel: true,
    },
    {
      title: 'Tipografia',
      href: '/typography',
      icon: <TextFieldsIcon />,
      devel: true,
    },
    {
      title: 'Icones',
      href: '/icons',
      icon: <ImageIcon />,
      devel: true,
    },
    {
      title: 'Minha conta',
      href: '/account',
      icon: <AccountBoxIcon />,
      devel: false,
    },
    {
      title: 'Configurações',
      href: '/settings',
      icon: <SettingsIcon />,
      devel: true,
    }
  ]
    .filter(page => !(process.env.NODE_ENV === 'production' && page.devel))
    .filter(Boolean);

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
