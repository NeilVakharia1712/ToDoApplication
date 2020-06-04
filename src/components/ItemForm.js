import React, { useState } from 'react';
import {
	Button,
	ListItem,
	List,
	InputLabel,
	FormControl,
	DialogActions,
	OutlinedInput,
	InputAdornment,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	Fab,
	Slide,
	Typography,
	Fade,
	IconButton
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import { addnote } from '../utils/FirebaseDbUtils'
import { getUser } from '../utils/FirebaseAuthUtils'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import '../App.css';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

const useStyles = makeStyles(theme => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	fab: {
		margin: 0,
		top: 'auto',
		right: 'auto',
		bottom: 20,
		left: 20,
		position: 'fixed'
	}
}));

const SlideTransition = React.forwardRef((props, ref) => {
	return <Slide direction="up" ref={ref} {...props} />;
});

const FadeTransition = React.forwardRef((props, ref) => {
	return <Fade ref={ref} {...props} />
})

const ItemForm = () => {
	const classes = useStyles();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
	const [note, setnote] = useState({
		task: '',
		description: '',
        date: '',
        time: '',
	});
	const [progress, setProgress] = useState(0);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		initialState();
		setOpen(false);
	};

	const initialState = () => {
		setProgress(0);
		setnote({
			task: '',
            description: '',
            date: '',
            time: '', 

		})
	}

	const handleChange = prop => event => {
        
        setnote({ ...note, [prop]: event.target.value });
	};

	const addItem = () => {
		var today = new Date().getTime()
		var input = new Date(note.date).getTime()
		if(note.description && note.task && note.date && input > today)
            {
                addnote(getUser().uid, note)
                handleClose()
			}
        
    };

	return (
		<div>
			<div className={classes.root}>
				<IconButton onClick={handleClickOpen} className={classes.fab} style = {{transform: "scale(1.5)",background:'#67A6FC', color:"white"}}aria-label="edit">
					< LibraryBooksIcon/>
				</IconButton>
			</div>
			<Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' fullScreen={fullScreen} TransitionComponent={fullScreen ? SlideTransition : FadeTransition}>
				<DialogTitle  style = {{textAlign: "center" ,  fontFamily: 'Proxima Nova, sans-serif'}}id='alert-dialog-title'>Add Task To Your List</DialogTitle>
				<DialogContent>
					<Typography style = {{fontFamily: 'Proxima Nova, sans-serif'}}> Please make sure that all the fields are filled out and you have not selected a time which has already passed!</Typography>
					<List>
						<ListItem>
							<TextField label="Task" value={note.name} variant="outlined" onChange={handleChange('task')} />
						</ListItem>
						<ListItem>
							<TextField multiline label="Description" value={note.description} variant="outlined" onChange={handleChange('description')} />
						</ListItem>
                        <ListItem>
                        <TextField
                                id="datetime-local"
                                label="Finish Before"
                                type="datetime-local"
                                defaultValue="2020-05-24T10:30"
                                onChange={handleChange('date')}
                                className={classes.textField}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </ListItem>
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => { handleClose() }}>Cancel</Button>
					<Button variant="contained" style = {{background:'#67A6FC', color:"white"}} onClick={() => {addItem()}}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default ItemForm