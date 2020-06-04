import React, { useState, useEffect } from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import CompletedCard from "./CompletedCard";
import { Grid, Container, Typography } from "@material-ui/core";
import { updateUserState } from "../utils/FirebaseAuthUtils";

const ProductList = ({ productIds , user ,setPage, page}) => {
    const [my_user, setUser] = useState(null)
    useEffect(() => {
        if(user) {
            updateUserState(setUser) 
        }
    },[my_user] );
    console.log(productIds)
    if (productIds) {
        if(productIds[0] == 0){
            if (page === "active")
            {
                return (
                    <Container>
                        <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
                        <div style = {{textAlign: "center"}}><img src='notepad.png' alt='closet' style={{ height: '20%', marginTop: "25%"}}></img> </div>
                        <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '10%' }}>Looks like you have nothing to do! </h2>
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
                
                productIds.map(productId => {
                return (
                    <Grid key={productId} item= {true} xs = {12}>
                    {
                        page === "active"?
                        <ProductCard productId={productId} user = {user} setPage = {setPage} />: 
                        <CompletedCard productId={productId} user = {user} setPage = {setPage} />
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
                    <div style = {{textAlign: "center"}}><img src='notepad.png' alt='closet' style={{ height: '20%' , marginTop: "25%"}}></img></div>
                    <h2 style={{ color: '#707070', fontSize: '20px', textAlign: 'center', fontFamily: 'Proxima Nova, sans-serif', marginTop: '10%' }}>Looks like you have nothing to do! </h2>
                    </div>
            </Container>
                 )
      }
      else{
        console.log("here")
        return(
        <Container>
        <div style={{ textAlign: 'center', height: '100vh', width: '100%', alignItems: 'center' }}>
       <img src='Completed.png' alt='closet' style={{ height: '20%', left: '50%', marginTop: '10%' }}></img>
        </div>
        </Container>
        )
    }
  }
};
export default ProductList;