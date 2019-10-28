/* eslint-disable react/jsx-sort-props */
import React, { useState, useContext } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Grid,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogActions
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';

const useStyles = makeStyles(() => ({
  preview: { width: '100%' },
}));

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [result, setResult] = useState();
  const [selectedFile, setSelectedFile] = useState();
  const { user, setUser } = useContext(Context);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleImgChange = event => {
    setSelectedFile(event.target.files[0]);
    setResult();
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setResult(reader.result)
    });
    reader.readAsDataURL(event.target.files[0]);
  };


  const handleSubmit = e => {
    e.preventDefault();
    api.post(`/users/${user.id}/image`, new FormData(document.forms.namedItem('formulario-upload-imagem')))
      .then(() => {
        setUser(user => ({ ...user, image: `/users/${user.id}/image` }))
      })
      .catch(() => null)
      .then(() => {
        setOpen(false);
        setResult();
      })
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="text"
      >
        Enviar foto
      </Button>
      <Dialog
        aria-describedby="transition-modal-description"
        aria-labelledby="transition-modal-title"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        onClose={handleClose}
        open={open}
      >
        <DialogTitle>
          {!selectedFile ? 'Selecione uma foto de perfil' : ''}
          {selectedFile ? `Arquivo selecionado: ${selectedFile.name}` : ''}
        </DialogTitle>
        <form
          autoComplete="off"
          noValidate
          onSubmit={handleSubmit}
          id="formulario-upload-imagem"
        >
          <DialogContent>
            <Grid
              container
            >
              {result && (
                <img
                  alt="Preview"
                  src={result}
                  className={classes.preview}
                />
              )}
              <input
                accept="image/*"
                onChange={handleImgChange}
                type="file"
                name="image"
                required
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              color="primary"
            >
              Cancelar
            </Button>
            <Button
              color="primary"
              autoFocus
              type="submit"
            >
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div >
  );
}
