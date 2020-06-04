import React, { useState, useEffect } from "react";
import "rbx/index.css";
import NoteCard from "./NoteCard";
import CompletedCard from "./CompletedCard";
import { Grid, Container, Typography } from "@material-ui/core";
import { updateUserState } from "../utils/FirebaseAuthUtils";

const NoteList = ({ noteIds , user ,setPage, page}) => {
    const [my_user, setUser] = useState(null)
    useEffect(() => {
        if(user) {
            updateUserState(setUser) 
        }
    },[my_user] );
    console.log(noteIds)
    if (noteIds) {
        if(noteIds[0] == 0){
            if (page === "active")
            {
                return (
                    <Container>
                        <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
                        <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '20%', fontWeight: "bolder"}}>USE THE BUTTON BELOW TO ADD A TASK! </h2>
                        <div style = {{textAlign: "center"}}><img src='notepad.png' alt='closet' style={{ height: '10%' }}></img></div>
                        
                        </div>
                    </Container>
                )
            }
            else{
                return(
                <Container>
                <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
                <img src='Completed.png' alt='closet' style={{ height: '20%', left: '50%', marginTop: '10%' }}></img>
                </div>
                </Container>
                )
            }
        }
        else{
            return (
        <Container>
            <div style={{height:'10px'}}></div>
                {page ==="active"? <Typography style = {{textAlign : "center", fontFamily: 'Gill Sans', fontWeight: 600, color: 'grey',letterSpacing: '4px' }}> TASKS TO DO</Typography>
                : <Typography style = {{textAlign : "center", fontFamily: 'Gill Sans', fontWeight: 600, color: 'grey',letterSpacing: '4px' }}> COMPLETED</Typography>}
            {
                
                noteIds.map(noteId => {
                return (
                    <Grid key={noteId} item= {true} xs = {12}>
                    {
                        page === "active"?
                        <NoteCard noteId={noteId} user = {user} setPage = {setPage} />: 
                        <CompletedCard noteId={noteId} user = {user} setPage = {setPage} />
                    }
                    </Grid>
                );
                })
            }
        </Container>
        );
        }
  } else {
      if(page === "active"){
            return  (     
            <Container>
                    <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
                    <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '20%', fontWeight: "bolder"}}>USE THE BUTTON BELOW TO ADD A TASK! </h2>
                    <div style = {{textAlign: "center"}}><img src='notepad.png' alt='closet' style={{ height: '20%'}}></img></div>
                    
                    </div>
            </Container>
                 )
      }
      else{
        console.log("here")
        return(
        <Container>
        <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
       <img src='Completed.png' alt='closet' style={{ height: '20%', left: '50%'}}></img>
        </div>
        </Container>
        )
    }
  }
};
export default NoteList;