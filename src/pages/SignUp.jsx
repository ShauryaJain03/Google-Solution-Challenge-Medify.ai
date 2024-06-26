import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// eslint-disable-next-line no-unused-vars
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import 'react-toastify/dist/ReactToastify.css';
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth,db } from "../components/Firebase";
import { setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { useState } from "react";
function SignUp() {


  return (
    <>
      <Navbar />
      <div
        className="flex w-full h-full bg-medBlue-50 my-6 justify-center items-center"
        style={{ marginBottom: "30px", paddingRight: "50px" }}
      >
        <div className="w-1/2 hidden md:block mt-[150px]">
          <div className="flex flex-col">
            <div className="flex items-center justify-center">
              <img src="../../logo.png" height={80} width={80} />
              <p className="text-medBlue-200 text-2xl font-serif px-2">
                Medify.ai
              </p>
            </div>
            <p className="text-center my-3 text-medBlue-200 font-serif text-xl">
              Easy , Fast and Precise Health Analysis
            </p>
            <p className="text-medBlue-200 px-3 text-center">
              Transforming lives with AI-driven health insights and connections
              to trusted professionals. Your path to proactive well-being starts
              here.
            </p>
          </div>
        </div>
        <div className="bg-white border-2 border-red-40 md:w-1/2 shadow-xl">
          <Register />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp

const defaultTheme = createTheme();

function Register() {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [passwd,setPasswd]=useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
       await createUserWithEmailAndPassword(auth,email,passwd);
       const user=auth.currentUser;
       console.log(user);
       if(user){
        await setDoc(doc(db,"Users",user.uid),{
            name:name,
            email:user.email,
            passwd:passwd
        })
       }
       toast.success("User Registered Succesfully!",{
        position:"top-left"
       })

       setTimeout(() => {
        window.location.href="/login"
      }, 2000);

    }catch(err){
        console.log(err);
        toast.success(err.message,{
            position:"top-left"
        })
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" className="bg-white">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 8,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1c9bcd" }}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              type="text"
              autoFocus
              onChange={(e)=>{setName(e.target.value)}}
              id="name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={(e)=>{setEmail(e.target.value)}}
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              onChange={(e)=>{setPasswd(e.target.value)}}
              id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#1c9bcd" }}
            >
              Register
            </Button>
            
            <Grid container>
              <div className="flex flex-col md:flex-row justify-center items-center w-full">
                <Grid item xs>
                  <Link to="/login">
                    <div className="text-blue-500">Already have an account? Login</div>
                  </Link>
                </Grid>
              </div>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}