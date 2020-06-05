import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import NoteList from "./components/NoteList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUsernotesInfo , addnote, getnoteInfo, getCompletedNoteInfo} from "./utils/FirebaseDbUtils.js"
import "./App.css";
import {Startup} from './components/Startup/Startup'


const App = () => {
  const [user, setUser] = useState(null);
  const [noteIds, setnoteIds] = useState(null);
  const [completedIds, setCompletedIds] = useState(null)
  const [page, setPage] = useState('active');

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if(user){
      getUsernotesInfo(user.uid, setnoteIds)
      getCompletedNoteInfo(user.uid, setCompletedIds)
    }
  }, [user]);

  if(!user){
    return(
      <Startup/>
    )
  }
  
  return (
    <Container disableGutters>
      <TopAppBar user={user} setPage = {setPage}  page = {page}/>
      { 
        page === "active" ? 
        <div>
        <ItemForm/>  
        <NoteList noteIds={noteIds} user = {user} setPage = {setPage} page = {page}/> </div> : <NoteList noteIds={completedIds} user = {user} setPage = {setPage} page = {page}/>
      } 
    </Container>
  ); 
};

export default App;