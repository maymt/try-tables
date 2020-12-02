import React from 'react';
import {Card, Typography, CardContent, CardActions} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Receipt} from '@material-ui/icons';
import createDatos from '../pages/App2';



function Resumen(props) {

    const useStyles= makeStyles(()=>({
        root:{
            textAlign: 'center',
            background: props.color
        },
        texto:{
            fontSize: 18,
            color: props.font,
            textAlign: 'left'
        },
        titulo:{
            fontWeight: 'bold',
            fontSize: 22,
            color: props.font
        }
        }));

    const classes=useStyles();
    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.titulo}>
                {props.titulo}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto1}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto2}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto3}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto4}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto5}
                </Typography>

                <Typography className={classes.texto}>
                {props.texto6}
                </Typography>

                <br></br>
                <br></br>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<Receipt />}
                    onClick={()=> createDatos()}
                    >
                    Calcular
                </Button>

            </CardContent>
        </Card>
    );
}

export default Resumen;