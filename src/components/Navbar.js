import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import logo from '../assets/img/logo-blanco.png';

const useStyles = makeStyles(()=>({
	root: {
		flexGrow: 1,
		fixed: 'top'
	},
	homeButton: {
		marginRight: '20px'
	},
	title: {
		flexGrow: 1,
		fontWeight: 'bold'
	},
	borderRadius: '50%'
}));

function Navbar() {
	const classes = useStyles();
	return (
		<div className = {classes.root}>
			<AppBar position = "static" style={{ background: '#006C90'}}>
				<Toolbar>
					<IconButton edge = "start" className = {"classes.homeButton"} color = "inherit" href = "http://localhost:3000/">
						<Home />
					</IconButton>
					<Typography variant="h5" className={classes.title}>
						MVP Sobrestadía
					</Typography>
					<IconButton color="inherit">
						<img src={logo} width="100px" height="40px" className={classes.imagen}/>
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;