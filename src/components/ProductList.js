import React, { useState, useEffect } from "react";
import "rbx/index.css";
import ProductCard from "./ProductCard";
import { Grid, Container } from "@material-ui/core";
import { updateUserState } from "../utils/FirebaseAuthUtils";

const ProductList = ({ productIds , user}) => {
    const [my_user, setUser] = useState(null)
    useEffect(() => {
        if(user) {
            updateUserState(setUser) 
        }
    },[my_user] );
    if (productIds) {
    return (
      <Container>
        <div style={{height:'10px'}}></div>
          {
            productIds.map(productId => {
              return (
                <Grid key={productId} item= {true} xs = {12}>
                  <ProductCard productId={productId} user = {user} />
                </Grid>
              );
            })
          }
      </Container>
    );
  } else {
    return null;
  }
};
export default ProductList;