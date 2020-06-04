import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea, IconButton } from "@material-ui/core";
import { getProductInfo} from '../utils/FirebaseDbUtils'
import firebase from "firebase/app";
import "firebase/storage";
import ItemForm from "./ItemForm"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import moment from 'moment';
import { render } from "@testing-library/react";
import EditIcon from '@material-ui/icons/Edit';
import { addProduct } from '../utils/FirebaseDbUtils'
import { getUser } from '../utils/FirebaseAuthUtils'
import { updateUserState } from "../utils/FirebaseAuthUtils";
import CloseIcon from '@material-ui/icons/Close';


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
    DialogContentText,
	TextField,
	Fab,
	Slide,
	Fade
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});


const ProductCard = ({ productId, user}) => {
  const classes = useStyles();
  const [product, setProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [my_user, setUser] = useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

	const [progress, setProgress] = useState(0);

	const handleClose = () => {
		initialState();
		setOpen(false);
	};

	const initialState = () => {
		setProgress(0);
		setProduct({
			task: product.task,
            description: product.description,
            date: product.date,
            time: 'true', 

		})
	}

	const handleChange = prop => event => {
        
        setProduct({ ...product, [prop]: event.target.value });
	};

	const addItem = () => {
        if(product.description && product.task && product.date)
            {
                
                handleClose()
            }
        
    };


    useEffect(() => {
        if(user) {
            updateUserState(setUser) 
        }
    },[my_user] );


  useEffect(() => {
    if (productId) {
      getProductInfo(productId, setProduct)
    }
  }, []);


  if (product) {
    var output_dat = product.date.split("T")
    var dates = new Date(product.date).getTime()
    //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var today_date = new Date().getTime()
    var my_date = new Date()
    var to_do;
    var time_remaining; 
    var passed;
    var is_passed = false
    if(dates - today_date < 0){
        passed= "THE TIME TO FINISH THIS TASK HAS PASSED"
        is_passed = true;
    }
    
    else{
        to_do = moment.duration(dates-today_date)
        var years = to_do.years()
        var months = to_do.months()
        var days = to_do.days()
        var hours = to_do.hours()
        var minutes = to_do.minutes()

        if(years == 0 & months == 0 & days == 0){
            time_remaining = hours+" hours and "+minutes+" minutes to complete! "
        }
        else if (years == 0 & months == 0 & days > 0){
            time_remaining = days + " days and "+hours+ " hours to complete!"
        }
        else if (years == 0 & months > 0){
            time_remaining = months + " months and "+ days+ " days to complete!"
        }
        else if (years > 0) {
            time_remaining = years + " years and "+ months + " months to complete!" 
        }
        else{
            time_remaining = "Invalid"
        }
    }
    
    return (
      <div>
      <Card style = {{marginTop : "10px"}} >
        
          <CardContent>
          <Grid container>
          <Grid item = {true} xs={9} onClick = {() => {
            }}>
              <Typography gutterBottom variant="subtitle2"
              align="left"
              style = {{fontSize: '25px' , fontWeight: "bold"}}
              >
                {product.task}
                <IconButton onClick={handleClickOpen}
                >
                    <EditIcon />
                </IconButton>
              </Typography>
              
            </Grid>
            <Grid item = {true}xs={3}>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align="right"
                color="secondary"
              >
                {output_dat[1]} 
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align="right"
                color="secondary"
              >
                {output_dat[0]}
              </Typography>
            </Grid>
           
            <Grid item = {true} xs={8}>
              <Typography
                gutterBottom
                variant="body2"
                component="h2"
                align = "left"
              >
                {product.description}
              </Typography>
            </Grid>
            <Grid item = {true} xs = {12}></Grid>
            <Grid item = {true} xs={8}>
            </Grid>
            <Grid item = {true} xs = {4}></Grid>
            <Grid item = {true} xs={11}> 
            {
                    is_passed? <Typography> {passed} </Typography> : 
                    <Typography>
                        {time_remaining}
                    </Typography> 
                }
                </Grid>
            <Grid item = {true} xs={1}>
                <IconButton 
                align = "right" onClick = {() => {
                    const db = firebase.database();
                    const updateUser = {};
                    updateUser['Users/'+ user.uid+'/Completed/'+ productId] = new Date(product.date).getTime();
                    product.time = new Date(product.date)
                    db.ref().update(updateUser);
                    db.ref('Users/'+ user.uid+'/Products/'+ productId).remove();
                }} 
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
          </Grid>
        </CardContent> 
      </Card>
      <ItemForm open = {open}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' >
				<IconButton style = {{marginLeft: "90%"}} onClick={() => { handleClose() }}> <CloseIcon/> </IconButton>
                <DialogTitle id='alert-dialog-title'>UPDATE TASK</DialogTitle>
				<DialogContent> 
					<List>
						<ListItem>
							<TextField label="Task" value={product.task} variant="outlined" onChange={handleChange('task')  } />
						</ListItem>
						<ListItem>
							<TextField multiline label="Description" value={product.description} variant="outlined" onChange={handleChange('description')} />
						</ListItem>
                        <ListItem>
                        <TextField
                                id="datetime-local"
                                label="Finish Before"
                                type="datetime-local"
                                defaultValue= {product.date}
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
					<Button onClick={() => { handleClose() ; firebase.database().ref('Users/'+ user.uid+'/Products/'+ productId).remove();
                    firebase.database().ref('Products/'+ productId).remove();}}>Delete</Button>
					<Button variant="contained" color="secondary" onClick={() => {addItem()}}>Submit</Button>
				</DialogActions>
			</Dialog>

   </div>
      
    );
  } else {
    return null;
  }
};

export default ProductCard;