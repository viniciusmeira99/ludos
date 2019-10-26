import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Button,
    Grid
} from '@material-ui/core';
import Context from 'Context';
import api from 'api';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [selectedFile, setSelectedFile] = useState([]);
    const { user, setUser } = useContext(Context);
    const [values, setValues] = useState({ ...user });
    const [errors, setErrors] = useState({});

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    function readFile(event) {
        const newValues = {
            ...values,
            "image": event.target.result
        };
        setValues(newValues);

        api.put(`/users/${values.id}`, values)
            .then((response) => {
                // put não entra no then
            }).catch((err) => {
                if (err.errors) {
                    setErrors(err.errors);
                }
            });
        setUser(values);
        setOpen(false);
    }

    const handleImgChange = event => {
        setSelectedFile(event.target.files[0]);
    };


    const handleSubmit = e => {
        e.preventDefault();
        var file = selectedFile;
        var reader = new FileReader();
        reader.addEventListener('load', readFile);
        reader.readAsText(file);
    };

    return (
        <div>
            <Button variant="text" onClick={handleOpen}>
                Enviar foto
      </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className={classes.paper} >
                            <Grid
                                container
                                spacing={4}
                            >
                                <Grid
                                    item
                                    xs={12}
                                >
                                    <h3 id="transition-modal-title">Arquivo selecionado: {selectedFile.name} </h3>
                                </Grid>
                                <br></br>
                                <Grid
                                    item
                                    xs={7}
                                >
                                    <Button
                                        variant="contained"
                                        component="label"
                                    >
                                        Selecionar foto
                                    <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImgChange}
                                            style={{ display: "none" }}
                                        />
                                    </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                >
                                    <Button
                                        variant="contained"
                                        component="label"
                                        onClick={handleSubmit}
                                    >
                                        Salvar
                                </Button>
                                </Grid>
                                <Grid
                                    item
                                    xs={3}
                                >
                                    <Button
                                        variant="contained"
                                        component="label"
                                        onClick={handleClose}
                                    >
                                        Cancelar
                                </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div >
    );
}
