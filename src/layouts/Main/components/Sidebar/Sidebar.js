import React, { useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GamepadIcon from '@material-ui/icons/Gamepad';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import QuestionIcon from '@material-ui/icons/QuestionAnswer'
import SendIcon from '@material-ui/icons/Send'
import ActionIcon from '@material-ui/icons/Assignment'
import { Profile, SidebarNav } from './components';
import Context from 'Context';
import { LEVEL_ADMIN, LEVEL_USER } from 'consts';

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
    },
  ].concat(
    user.level === LEVEL_ADMIN
      ? [
        {
          title: 'Usuários',
          href: '/users',
          icon: <PeopleIcon />,
        },
        {
          title: 'Jogos',
          href: '/games',
          icon: <GamepadIcon />,
        },
        {
          title: 'Perguntas',
          href: '/questions',
          icon: <QuestionIcon />,
        },
        {
          title: 'Lançamento de ações',
          href: '/user-actions',
          icon: <SendIcon />,
        },
        {
          title: 'Ações',
          href: '/actions',
          icon: <ActionIcon />,
        },
      ] : []
  ).concat(
    user.level === LEVEL_USER
      ? [
        {
          title: 'Minhas ações',
          href: '/my-actions',
          icon: <ActionIcon />,
        },
        {
          title: 'Perguntas',
          href: '/user-questions',
          icon: <QuestionIcon />,
        },
      ] : []
  ).concat(
    [
      {
        title: 'Minha conta',
        href: '/account',
        icon: <AccountBoxIcon />,
      },
    ]
  );

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
