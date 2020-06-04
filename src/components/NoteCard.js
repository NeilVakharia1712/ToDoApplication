import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea, IconButton, Container} from "@material-ui/core";
import { getnoteInfo, getCompletetionTime} from '../utils/FirebaseDbUtils'
import firebase from "firebase/app";
import "firebase/storage";
import ItemForm from "./ItemForm"
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import moment from 'moment';
import { render } from "@testing-library/react";
import EditIcon from '@material-ui/icons/Edit';
import { addnote } from '../utils/FirebaseDbUtils'
import { getUser } from '../utils/FirebaseAuthUtils'
import { updateUserState } from "../utils/FirebaseAuthUtils";
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { Textfit } from 'react-textfit';



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


const NoteCard = ({ noteId, user, setPage}) => {
  const classes = useStyles();
  const [note, setnote] = useState(null);
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
		setnote({
			task: note.task,
            description: note.description,
            date: note.date,
            time: 'true', 

		})
	}

	const handleChange = prop => event => {
        
        setnote({ ...note, [prop]: event.target.value });
	};

	const addItem = () => {
        if(note.description && note.task && note.date)
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
    if (noteId) {
      getnoteInfo(noteId, setnote)
    }
  }, []);


  if (note) {
    var output_dat = note.date.split("T")
    var dates = new Date(note.date).getTime()
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
      <Card container style = {{marginTop : "10px"}} wrap = "wrap">
      <IconButton onClick = {() => {firebase.database().ref('Users/'+ user.uid+'/notes/'+ noteId).remove();
                    firebase.database().ref('notes/'+ noteId).remove();}}>
          <CloseIcon style = {{float: "left"}}/>
        </IconButton>
        <Typography gutterBottom
                variant="body2"
                component="h2" 
           
                style = {{fontFamily: 'Proxima Nova, sans-serif', color: "grey", display: 'inline-block', float: 'right' }}>
                  Complete By {output_dat[1]} on {output_dat[0]} 

        </Typography>
          <CardContent>
          <Grid container style = {{width : '100%', height:'100%'}}>
          <Grid item = {true} xs={12}>
              <Typography gutterBottom variant="subtitle2"
              align="left"
              style = {{fontSize: '25px' , fontWeight: "bold", fontFamily: 'Proxima Nova, sans-serif'}}
              >
                {note.task}
                <IconButton onClick={handleClickOpen}
                >
                    <EditIcon style = {{width: "25px", height: "25px"}} />
                </IconButton>
              </Typography>
              
            </Grid>           
            <Grid item = {true} xs={12} wrap="wrap" style = {{height: "90%"}}>
              
              <Typography
                style = {{fontSize: '20px', fontFamily: 'Proxima Nova, sans-serif' }}
                align = "left"
              >
                 
                {note.description}
                
              </Typography>
            
            </Grid>
            <Grid style = {{marginTop: "5%"}}item = {true} xs={11}> 
            {
                    is_passed? <Typography style = {{fontSize: '15px', fontFamily: 'Proxima Nova, sans-serif', fontStyle: "italic"}}> {passed} </Typography> : 
                    <Typography style = {{fontSize: '15px', fontFamily: 'Proxima Nova, sans-serif', fontStyle: "italic"}}>
                        {time_remaining}
                    </Typography> 
                }
                </Grid>
          </Grid>
        </CardContent> 

        <IconButton 
                style = {{ color: "#6699FF", float: 'right', marginRight:'3%', marginBottom: '2%'}} onClick = {() => {
                    const db = firebase.database();
                    const updateUser = {};
                    updateUser['Users/'+ user.uid+'/Completed/'+ noteId] = new Date(note.date);
                    db.ref().update(updateUser);
                    firebase.database().ref('notes/'+ noteId).set(
                      {
                          "date": new Date().getTime() ,
                          "description": note.description, 
                          "task": note.task,
                          "time" : new Date()
                      }
                    );
                    db.ref('Users/'+ user.uid+'/notes/'+ noteId).remove();
                }}  
                >
                    <CheckCircleIcon style = {{transform:'scale(3)'}}/>
                </IconButton>
      </Card>
      <ItemForm open = {open}/>
      <Dialog open={open} onClose={handleClose} aria-labelledby='alert-dialog-title' >
				<IconButton style = {{marginLeft: "90%"}} onClick={() => { handleClose() }}> <CloseIcon/> </IconButton>
                <DialogTitle style = {{textAlign: "center" ,  fontFamily: 'Proxima Nova, sans-serif'}} id='alert-dialog-title'>UPDATE TASK</DialogTitle>
				<DialogContent> 
					<List>
						<ListItem>
							<TextField label="Task" value={note.task} variant="outlined" onChange={handleChange('task')  } />
						</ListItem>
						<ListItem>
							<TextField multiline label="Description" value={note.description} variant="outlined" onChange={handleChange('description')} />
						</ListItem>
                        <ListItem>
                        <TextField
                                id="datetime-local"
                                label="Finish Before"
                                type="datetime-local"
                                defaultValue= {note.date}
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
					<Button onClick={() => { handleClose() ; firebase.database().ref('Users/'+ user.uid+'/notes/'+ noteId).remove();
                    firebase.database().ref('notes/'+ noteId).remove();}}>Delete</Button>
					<Button variant="contained" style = {{backgroundColor:"#67A6FC", color: 'white'}} onClick={() => {addItem()}}>Submit</Button>
				</DialogActions>
			</Dialog>

   </div>
      
    );
  } else {
    return null;
  }
};

export default NoteCard;