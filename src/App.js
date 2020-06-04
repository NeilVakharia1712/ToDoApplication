import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import TopAppBar from "./components/TopAppBar";
import ItemForm from "./components/ItemForm";
import ProductList from "./components/ProductList";
import { updateUserState } from "./utils/FirebaseAuthUtils";
import { getUserProductsInfo , addProduct, getProductInfo, getCompletedNoteInfo} from "./utils/FirebaseDbUtils.js"
import "./App.css";
import {Startup} from './components/Startup/Startup'


const App = () => {
  const [user, setUser] = useState(null);
  const [productIds, setProductIds] = useState(null);
  const [completedIds, setCompletedIds] = useState(null)
  const [page, setPage] = useState('active');

  // Change user state when the user successfully logged in
  useEffect(() => {
    updateUserState(setUser);
  }, [user]);

  useEffect(() => {
    if(user){
      getUserProductsInfo(user.uid, setProductIds)
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
      <TopAppBar user={user} setPage = {setPage} />
      { 
        page === "active" ? 
        <div>
        <ItemForm/>  
        <ProductList productIds={productIds} user = {user} setPage = {setPage} page = {page}/> </div> : <ProductList productIds={completedIds} user = {user} setPage = {setPage} page = {page}/>
      } 
    </Container>
  ); 
};

export default App;