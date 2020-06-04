import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, useScrollTrigger, CssBaseline, Grid , Avatar, Button, IconButton} from '@material-ui/core';
import { signInWithGoogle, getUser } from '../utils/FirebaseAuthUtils';
import AppDrawer from './AppDrawer';
import { makeStyles } from "@material-ui/core/styles";
import LogoutPopover from './LogoutPopover';

const useStyles = makeStyles({
  appBar: {
    background: 'linear-gradient(153deg, #67A6FC 30%, #D4FFE8 90%)'
  },
  titleText: {
    textAlign: 'center'
  },
  ToDoText: {
		display: 'inline-block', 
		fontFamily:'Gill Sans', 
		fontWeight: '600', 
		color:'white', 
		letterSpacing:'4px'
	},
	ProText: {
		display: 'inline-block',
		fontStyle: 'italic',
		color:'white',
		letterSpacing:'4px', 
		fontWeight: "300",
		fontFamily:'Gill Sans'
	}
});

const ElevationScroll = props => {
	const { children, window } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
		target: window ? window() : undefined,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
}

ElevationScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

// App bar at the top of the application, example from Material UI
const TopAppBar = (props) => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<ElevationScroll {...props}>
				<AppBar className={classes.appBar} >
					<Toolbar style = {{height: '10%'}}>
							<AppDrawer setUser={props.setUser} user={props.user} setPage={props.setPage} />
						<Grid container alignItems="center" justify="space-between">
							<Grid item = {true}>
								<Typography>
								<h1 className={classes.titleText} >
									<div className={classes.ToDoText}>FINISH IT </div>
          				<div className={classes.ProText}>_NOW</div>
          				</h1>
								</Typography>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<Toolbar />
		</React.Fragment>
	);
}

export default TopAppBar;