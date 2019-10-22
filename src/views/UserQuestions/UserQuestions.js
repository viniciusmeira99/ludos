import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import Context from 'Context';
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  CardActions,
  Grid,
} from '@material-ui/core';
import { EmptyList } from 'components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
}));

const UserQuestions = () => {
  const classes = useStyles();
  const { selectedGame } = useContext(Context);

  if (!selectedGame) {
    return (
      <EmptyList
        subtitle={(
          <>
            Você precisa selecionar um jogo para continuar.
            <br />
            <Link to="/game-select">
              <Button
                variant="link"
              >
                Selecionar jogo
              </Button>
            </Link>
          </>
        )}
        title="Nenhum jogo selecionado."
      />
    );
  }

  if (selectedGame.questions.length === 0) {
    return (
      <EmptyList
        subtitle="Entre em contato com o administrador da sua empresa para disponibilizar as perguntas."
        title="Nenhuma questão disponível no jogo selecionado."
      />
    )
  }

  return (
    <div className={classes.root}>
      {/* {selectedGame.name} */}
      <Grid
        container
        spacing={4}
      >
        {selectedGame.questions.map((question) => (
          <Grid
            item
            lg={3}
            md={4}
            sm={6}
            xl={3}
            xs={12}
          >
            <Card key={question.id}>
              <CardHeader title={question.question.description} />
              <CardContent>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Alternativas:</FormLabel>
                  {question.question.alternatives.map((alternative) => (
                    <FormControlLabel
                      control={
                        <Radio
                          name={`question-${question.id}-alternative`}
                          value={alternative.id}
                        />
                      }
                      key={alternative.id}
                      label={alternative.description}
                    />
                  ))}
                </FormControl>
              </CardContent>
              <CardActions>
                <Button
                  color="primary"
                  size="small"
                >
                  Responder
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default UserQuestions;
