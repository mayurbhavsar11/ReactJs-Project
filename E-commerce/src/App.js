import './App.css';
import data from './components/back/data/Data';
import Header from './components/front/header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './components/front/products/Products';
import Cart from './components/front/cart/Cart';
import { useState } from 'react';

function App() {

  const{productItems}= data;
  const [cartItems, setCartItems]=useState([])

  const handleAddProduct= (product)=>{
    const productExist = cartItems.find((item)=> item.id === product.id);
    if(productExist){
      setCartItems(cartItems.map((item)=> item.id === product.id?
      {...productExist, quantity:productExist.quantity + 1}: item));
    }
    else{
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
    }
  
    const handleRemoveProduct =  (product)=>{
    const productExist = cartItems.find((item)=> item.id === product.id);
    if(productExist.quantity===1){
      setCartItems(cartItems.filter((item)=>item.id!== product.id))
    }
    else{
      setCartItems(cartItems.map((item)=> item.id === product.id?
      {...productExist, quantity:productExist.quantity - 1}: item));
    }

  }

    const handleCartClearence= ()=>
    {
      setCartItems([]);
    }

  return (
    <div>
     <Router>
     <Header cartItems={cartItems}/>
     <Routes>
            <Route exact path='/' element={<Products productItems={productItems} handleAddProduct={handleAddProduct}/>}></Route>
            <Route exact path='/cart' element={<Cart cartItems={cartItems} handleAddProduct={handleAddProduct} handleRemoveProduct={handleRemoveProduct} handleCartClearence={handleCartClearence}/>}/>
      </Routes>
     </Router>

    </div>
  );
}

export default App;
