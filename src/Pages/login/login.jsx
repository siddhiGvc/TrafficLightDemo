import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate} from "react-router-dom"
import { Link } from '@mui/material';

import GVC from "../../assets/GVC.png";
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const SERVER_API=process.env.REACT_APP_API;
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
    const [showAlert, setShowAlert] = useState(false);
    const [message,setMessage]=useState("");
    const [type,setType]=React.useState("")

        const showAlertMessage = () => {
            setShowAlert(true);
        
            // You can optionally set a timeout to hide the alert after a few seconds
            setTimeout(() => {
            setShowAlert(false);
            }, 5000); // Hide the alert after 5 seconds (5000 milliseconds)
        };
        const navigate=useNavigate();
        const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const Data= {email: data.get('email'),
            password: data.get('password')}
        // console.log(data);
      
        fetch(`${SERVER_API}/pub/login`,{
            method:'POST',
            headers:{
            "Content-type":"application/json"
            },
            body:JSON.stringify(Data)
        })
        .then((res)=>{
            return res.json();
        })
        .then((json)=>{
        //  console.log(json);
        //  console.log(json.data.token);
        // console.log(json.data);
        localStorage.setItem('name',json.data.user.name);
        window.sessionStorage.setItem('token', json.data.token);
        navigate("/");
        // showAlertMessage();
        // localStorage.setItem("token",JSON.stringify(json.data.token));

        if(json.data.user.isAdmin)
        {
            localStorage.setItem('name',json.data.user.name);
            window.sessionStorage.setItem('token', json.data.token);
            showAlertMessage();
            setType("Success");
            setMessage("Login Successsfull With Admin")
            // localStorage.setItem("token",JSON.stringify(json.data.token));
            navigate('/')
        }
        else{
            showAlertMessage();
            setType("Warning");
            setMessage("Login should with Admin")
        }

        })
        .catch((err)=>{
            console.log("Login Error");
            showAlertMessage();
            setType("Error");
            setMessage("Entered Email/Password is Incorrect")

        })
      
   


    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
  };

  return <>

        {showAlert && (
        type === "Success" ? (
        <Alert severity="success">
            {message}
        </Alert>
        ) : type === "Warning" ? (
        <Alert severity="warning">
            {message}
        </Alert>
        ) : type=="Error" ?(
        <Alert severity="error">
            {message}
        </Alert>
        ):(
        null
        )
        )}

      
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor:"#fff",
            padding:'20px',
            boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            
          }}
        >
           <div>
               <img style={{width:"150px",height:"50px",marginBottom:"20px"}} src={GVC} />
               </div>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  </>
}