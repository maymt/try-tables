import React from 'react';
import { CardContent, Grid , Card, Modal} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FilterList from '@material-ui/icons/FilterList';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    background: 'white',
    paddingBottom: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 200,
  },
}));

export default function Filters() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <Card className={classes.root}>
      <CardContent className = {classes.root}>
        <h3>Filtros</h3>
        <Grid container spacing = {3}>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField className={classes.textField} id="cod_obra" label="Obra: " />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField
              id="fecha_inicio"
              label="Desde: "
              type="date"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <TextField
              id="fecha_fin"
              label="Hasta: "
              type="date"
              defaultValue=""
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<FilterList />}
            >
              Filtrar
            </Button>
          </Grid>
        </Grid>        
      </CardContent>
    </Card>
    </form>
  );
}
