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
	Fade,
	IconButton
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add'
import { addProduct } from '../utils/FirebaseDbUtils'
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
		right: 20,
		bottom: 20,
		left: 'auto',
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
	const [product, setProduct] = useState({
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
		setProduct({
			task: '',
            description: '',
            date: '',
            time: '', 

		})
	}

	const handleChange = prop => event => {
        
        setProduct({ ...product, [prop]: event.target.value });
	};

	const addItem = () => {
		var today = new Date().getTime()
		var input = new Date(product.date).getTime()
		if(product.description && product.task && product.date && input > today)
            {
                addProduct(getUser().uid, product)
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
				<DialogTitle id='alert-dialog-title'>Add Task To Your List</DialogTitle>
				<DialogContent>
					<List>
						<ListItem>
							<TextField label="Task" value={product.name} variant="outlined" onChange={handleChange('task')} />
						</ListItem>
						<ListItem>
							<TextField multiline label="Description" value={product.description} variant="outlined" onChange={handleChange('description')} />
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