import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PostDetails from './components/PostDetails/PostDetails';






const App = () => {
  const user=JSON.parse(localStorage.getItem('profile'))
  
 
   
  const id=process.env.REACT_APP_API_ENDPOINT;
  
  
  return (
    <BrowserRouter>
    <GoogleOAuthProvider clientId={`${id}`}>
    <Container maxWidth="lg">
    <Navbar/>
    <Routes>
    
    <Route path="/" exact element={<Navigate replace to="/posts" />} />
    <Route path="/posts" exact element={<Home/>} />
    
    <Route path="/posts/search/searching" eaxct element={<Home/>} />
    <Route path="/posts/:id" exact element={<PostDetails/>} />

    <Route path="/auth" exact element={!user?<Auth/>:<Navigate replace to="/posts" />} /> 
    

    </Routes>
     
    </Container>
    </GoogleOAuthProvider>
    </BrowserRouter>
  );
};

export default App;
