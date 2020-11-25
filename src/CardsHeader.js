import React from 'react';
import {Card, CardContent} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles= makeStyles(()=>({
    root:{
        textAlign: 'center',
    }
}));



function Cards(props) {
  const classes=useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
      </CardContent>
    </Card>
  );
}

export default Cards;
