import { useState, useEffect } from "react";
import Navbar from "../templates/Navbar";
import { Navigate, useNavigate } from "react-router-dom";

import axios, { Axios } from "axios";
import { Alert, Avatar, Button, FormControl, InputLabel, Link, makeStyles, MenuItem, Select, TextField } from "@mui/material";
import log from "../../log";
import gql from "graphql-tag"
import { useMutation } from "@apollo/client/react/hooks"
// import { ApolloProvider } from "@apollo/client";
// import { ApolloClient, InMemoryCache } from '@apollo/client';
// import { ApolloProvider } from '@apollo/client/react/hooks';
import { ApolloClient, InMemoryCache } from '@apollo/client';





const Login = (props) => {
    const mystyle = {
        color: "white",
    }
    const navigate = useNavigate();
    // const [loginUser, { loading }] = useMutation(loginmut, {
    //     update(
    //       _,
    //       {
            
    //       }
    //     ) {
         
    //     },
    //     onError(err) {

    //     },
    //   });

    const [logintype, settype] = useState(0);

    const Click = async () => {
    //     console.log(email);
        navigate("/vmguidelines");
        console.log(password)
        // loginUser();

        // if(logintype==1){



        // await axios.post("http://localhost:4000/user/login", { crossdomain: true, email: email, password: password }).then(response => {
        //     console.log(response.data);
        //     log.logged = 1;
        //     navigate("/", { state: { data: response.data } });
        // })
        // .catch(error => {
        //     alert("Invlaid Email or password");
        // })
        // }
        // else if(logintype==2){
        //     await axios.post("http://localhost:4000/user/vendorlogin", { crossdomain: true, email: email, password: password }).then(response => {
        //         console.log(response.data);
        //         log.logged = 1;
        //         navigate("/vendors",{state:{data:response.data,logged:1}});
        //     })
        //     .catch(error => {
        //         alert("Invlaid Email or password");
        //     })
        // }
        // else{
        //     alert("Plese Select a usertype")
        // }
    }
    
    const [email, setemail] = useState('');
    const [password, setpass] = useState('');



    return (
        <div className="signin">

            <div className="container login">
                <h1>Sign in</h1>
                <div className="form-floating mb-3" style={{ "width": "100%" }}>
                    <input type="email" className="form-control" id="user" value={email} placeholder="name@example.com" style={{ background: "none", color: "black" }} onChange={e => setemail(e.target.value)} />
                    <label htmlFor="user">Email address</label>
                </div>
                <div className="form-floating mb-3" style={{ "width": "100%" }}>
                    <input type="password" className="form-control" id="pass" value={password} placeholder="name@example.com" style={{ background: "none", color: "black" }} onChange={e => setpass(e.target.value)} />
                    <label htmlFor="pass">password</label>
                </div>
                <Button variant="contained" onClick={() => Click()}>Login</Button>
                <a onClick={() => { navigate("/signup") }}>new user? sign up</a>

            </div>
        </div>
    )
}

// const loginmut = gql`
// mutation(
//     $email:String!
//     $password:String!
// ){
//     login(
//         email:"aayush",
//         password:"123456"
//     ){
//         id
//         createAt
//     }
// }
// `

export default Login;