import firebase from "firebase"
import 'firebase/database';

const db = firebase.database();

const getUserProductsInfo = (userId, setProductIds) => {
    const getProductInfo = snapshot => {
        if (snapshot.val()) {
          let productIdArr = Object.keys(snapshot.val()).sort(function(a,b) 
            {
               
                return snapshot.val()[a] - snapshot.val()[b]
            }
            );
          
            setProductIds(productIdArr);
        }
        else{
            //const updateUser = {};
            //updateUser[`/Users/${usedId}/Products/` + 0] = true;
            //db.ref().update(updateUser);
            setProductIds([0])

        }
    };

    const userProductDb = db.ref(`Users/${userId}/Products`).orderByValue();
    userProductDb.on("value", getProductInfo, error => alert(error));
}

const getCompletetionTime = (userId, productId) => {
    const productDb = db.ref("User/" + userId + "/Completed/"+productId);
    productDb.once(
        "value",
        snapshot => {
            return snapshot.val()
        },
        error => alert(error)
    );
}

const getCompletedNoteInfo = (userId, setCompletedIds) => {

    const getProductInfo = snapshot => {
        if (snapshot.val()) {
          let productIdArr = Object.keys(snapshot.val()).sort(function(a,b) 
            {
               
                return snapshot.val()[a] - snapshot.val()[b]
            }
            );
          
            setCompletedIds(productIdArr);
        }
        else{
            //const updateUser = {};
            //updateUser[`/Users/${usedId}/Products/` + 0] = true;
            //db.ref().update(updateUser);
            setCompletedIds([0])

        }
    };

    const userProductDb = db.ref(`Users/${userId}/Completed`).orderByValue();
    userProductDb.on("value", getProductInfo, error => alert(error));
}

const getProductInfo = (productId, setProduct) => {
    const productDb = db.ref("Products/" + productId);
    productDb.once(
        "value",
        snapshot => {
            setProduct(snapshot.val());
        },
        error => alert(error)
    );
}


const addProduct = (usedId, product) =>{
    const productId = db.ref().child('Products').push().key;
    const updateProduct = {};
    const updateUser = {};
    updateProduct['/Products/' + productId] = product;
    updateUser[`/Users/${usedId}/Products/` + productId] = new Date(product.date).getTime();
    db.ref().update(updateProduct);
    db.ref().update(updateUser);
    return productId
}

export {getUserProductsInfo, getProductInfo, addProduct, getCompletedNoteInfo, getCompletetionTime}