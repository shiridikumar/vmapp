import { BrowserRouter, Routes, Route, Outlet, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import "./App.css";

import axios from "axios"
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import log from "./log";
import Login from "./components/users/Login";
import FormUpload from "./components/common/FormUpload";
import Navbar from "./components/templates/Navbar";
import FormViewer from "./components/common/FormViewer";
import VmForm from "./components/common/VmForm";

const Layout = (props) => {
  const navigate = useNavigate();
  const location=useLocation();
  if(!location.state){
      console.log("asdaaaa");
      return (
        <Login />
      )
    }
    
    else {
      return (
        <div className="homepage">
          <div className="navdiv continer">
            <Navbar />
          </div>
          <div className="container">
            <Outlet />
          </div>
        </div>
      )
    }
  }


  const App = (props) => {
    const params=useParams();
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/signin" element={<Login logged={0} />} />
            {/* <Route path="/signup" element={<Register />} /> */}
            <Route path="/" element={<Layout/>}>
              <Route path="/register" element={<Login />} />
            </Route>
            <Route path="/FormViewer" element={<FormViewer/>}/>
            
            <Route path="/vmguidelines" element={<FormUpload/>}/>
            <Route path="/VmForm" element={<VmForm/>}/>
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App;

