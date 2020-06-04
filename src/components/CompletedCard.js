import React, { useState, useEffect } from "react";
import "rbx/index.css";
import { makeStyles } from '@material-ui/core/styles';
import { Card, Grid, CardContent, Typography, CardMedia, CardActionArea, IconButton } from "@material-ui/core";
import { getnoteInfo , getCompletetionTime} from '../utils/FirebaseDbUtils'
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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


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


const CompletedCard = ({ noteId, user, setPage}) => {
console.log(getCompletetionTime(user.uid, noteId))
  const classes = useStyles();
  const [note, setnote] = useState(null);
  useEffect(() => {
    if (noteId) {
      getnoteInfo(noteId, setnote)
    }
  }, []);

  
  if (note) {
    var my_string = new Date(note.date).toString().split(" ")
    return (
        
      <Card style = {{marginTop : "10px"}} >
        
          <CardContent>
          <Grid container>
          <Grid item = {true} xs={9} onClick = {() => {
            }}>
              <Typography gutterBottom variant="subtitle2"
              align="left"
              style = {{fontSize: '25px' , fontWeight: "bold", fontFamily: 'Proxima Nova, sans-serif'}}
              >
                <IconButton style = {{color : "#67A6FC", float: "left"}}>
                    <CheckCircleOutlineIcon />
                </IconButton>
                {note.task}
                
              </Typography>
              
            </Grid>
            <Grid item = {true}xs={3}> </Grid>
           
            <Grid item = {true} xs={8}>
              <Typography
                style = {{color: 'grey' , fontSize: '15px' , fontStyle: "italic", fontFamily: 'Proxima Nova, sans-serif'}}
              >
                Completed On {my_string[0]} {my_string[1]} {my_string[2]} {my_string[3]} at {my_string[4]}
              </Typography>
            </Grid>
            <Grid item = {true} xs = {11}></Grid>
            <Grid item = {true} xs={1}>
                <IconButton style = {{transform: 'scale(2)'}}
                align = "right" onClick = {() => {
                    firebase.database().ref('Users/'+ user.uid+'/Completed/'+ noteId).remove();
                    firebase.database().ref('notes/'+ noteId).remove();
                }} 
                >
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
          </Grid>
        </CardContent> 
      </Card>
      
    );
  } else {
    return null;
  }
};

export default CompletedCard;