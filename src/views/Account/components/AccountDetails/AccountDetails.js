import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';

const useStyles = makeStyles(() => ({
  root: {}
}));


const schema = {
  name: {
    presence: { allowEmpty: false, message: 'Nome é obrigatório' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'E-mail é obrigatório' },
    email: true,
    length: {
      maximum: 64
    }
  },
  phone: {
    phone: true,
    length: {
      minimun: 10,
      maximum: 11,
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'A senha é obrigatória' },
    length: {
      maximum: 128
    }
  },
};

const AccountDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user, setUser } = useContext(Context);

  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({ ...user });

  const handleChange = event => {
    const newValues = {
      ...values,
      [event.target.name]: event.target.value
    };

    setValues(newValues);
    setErrors(validate(newValues, schema));
  };

  const handleSubmit = (e) => {

    api.put(`/users/${values.id}`, values)
      .then((response) => {
        // put não entra no then
      }).catch((err) => {
        if (err.errors) {
          setErrors(err.errors);
        }
      });
      setUser(values);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <CardHeader
          subheader="As informações podem ser atualizadas"
          title="Minha Conta "
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                error={errors.name}
                fullWidth
                helperText={errors.name && errors.name[0]}
                label="Nome"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={values.name || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={errors.email}
                fullWidth
                helperText={errors.email && errors.email[0]}
                label="E-mail"
                margin="dense"
                name="email"
                onChange={handleChange}
                required
                value={values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                helperText={errors.phone && errors.phone[0]}
                label="Telefone"
                margin="dense"
                name="phone"
                onChange={handleChange}
                type="string"
                value={values.phone || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            type="submit"
          >
            Atualizar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string
};

export default AccountDetails;
