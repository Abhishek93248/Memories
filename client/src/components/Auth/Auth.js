import {
  Avatar,
  Container,
  Paper,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin} from "@react-oauth/google";
import { AUTH } from "../../constants/actionTypes";
import { signin, signup } from '../../actions/auth';
import jwt_decode from "jwt-decode";

const Auth = () => {

  
  const classes = useStyles();
  const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState(initialState);
  const [isSignUp, setisSignUp] = useState(false);
  const handleShowPassword = () =>
    setShowPassword((prevshowPassword) => !prevshowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }


  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    

  };

  const switchMode = () => {
    setisSignUp((prevsisSignUp) => !prevsisSignUp);
  };

  
  const googleSuccess = (response) => {

    const token=response?.credential;
    
   
    const {email,name,picture,sub} = jwt_decode(token);
    
   
    
    try {
      dispatch({ type: AUTH, data: {result:{name,email,picture,sub},token}});
      navigate("/");
      
    } catch (error) {
      console.log(error);
    }
    
  };
  const googleError = () =>
    alert("Google Sign In was unsuccessful. Try again later");
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography>{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
              onSuccess={googleSuccess}
              onFailure={googleError}
              onError={googleError}
              size="large"
              theme="filled_blue"
              text="signin_with"

            />
            <br/>
          
            
          

          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp 
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
            
           
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
