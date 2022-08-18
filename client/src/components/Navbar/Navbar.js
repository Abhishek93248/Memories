import React, { useState,useEffect } from "react";
import {Link} from 'react-router-dom';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';
import * as actionType from '../../constants/actionTypes';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { googleLogout } from "@react-oauth/google";
import decode from 'jwt-decode';
const Navbar = () => {
   
    const classes = useStyles();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
   
    const dispatch = useDispatch();
    
    useEffect(() => {
      const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
      
      
      setUser(JSON.parse(localStorage.getItem('profile')));
      
     
      // eslint-disable-next-line
    }, [navigate]);
    const logout = () => {
      googleLogout();
      dispatch({ type: actionType.LOGOUT });
      
      navigate("/");
      
     
      setUser(null);
    };


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
     <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
    <Toolbar className={classes.toolbar}>
      {user? (
        <div className={classes.profile}>
        
          <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.picture}>{user?.result.name.charAt(0)}</Avatar>
          <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
          <Button variant="contained" className={classes.logout} onClick={logout} color="secondary" >Logout</Button>
        </div>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
       
                
      )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar