import axios, { Axios } from "axios";
import { useState } from "react";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import gql from "graphql-tag"
import Navbar from "./Navbar";

const FormUpload = () => {
  const [url, setUrl] = React.useState('');
  const [file, setfile] = useState("file");
  const [generated, setgen] = useState("");
  const [content, setcontent] = useState("");
  const onChange = (e) => {
    const files = e.target.files;
    files.length > 0 && setUrl(URL.createObjectURL(files[0]));
    setfile(files)
  };
  const navigate = useNavigate();
  const row = []
  const upload = () => {
    console.log("uploading");
    const form = document.querySelector("form");
    const formData = new FormData(form);
    axios.post("http://127.0.0.1:5000/FormUpload", formData, {
      headers: {

        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        'Content-Type': "multipart/form-data"
      }
    }).then(response => {

      console.log("succesfully submitted");
      console.log(response.data)
      
        // avigate("/VmForm",{state:{data:response.data}})
        row.push(
        <Button variant="contained" onClick={() => { navigate("/FormViewer", {state:{data:response.data}})}}>View Generated form</Button>
        )
      setcontent(row)
      setgen(1);
    })
  }



  return (
    <div className="formupload">
      <Navbar/>
      <div className="container pdfupload">
        <form enctype="multipart/form-data" method="POST" action="http://localhost:5000/FormUpload" style={{ width: "100%" }} >
          <div className="upload">
            {/* <img src={require('../img/formupload.png')} style={{ width: "150px", height: "100px" }}/> */}
            <label>
              <img src={require('../img/formupload.png')} style={{ height: "100px", width: "150px" }} />
              <input type="file" name="myfile" style={{ display: "none" }} onChange={onChange} />
              <h2>Upload File</h2>
            </label>

          </div>
          {url && generated != 1 && (
            <div className="pdfpreview" style={{ height: '600px', width: "500px" }}>
              <>

                <div
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    height: '100%',
                  }}
                >
                  <h2 style={{ "color": "black" }}>Preview</h2>
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                    <Viewer fileUrl={url} />
                  </Worker>

                </div>
                <label>
                  <Button variant="contained" onClick={() => { upload() }}>Submit</Button>
                  <input type="submit" style={{ display: "none" }} onChange={onChange} />
                </label>
              </>
            </div>
          )}
          {url && generated && (
            content
          )}
        </form>
      </div>
    </div>
  );
}

export default FormUpload