import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import "./../css/components.css"
import { Button, IconButton, Input, styled } from "@mui/material";


import PhotoCamera from '@mui/icons-material/PhotoCamera';
import axios from "axios";

const FormViewer = () => {
    const [url, setUrl] = useState('');
    const location = useLocation();
    const formfields = location.state.data;
    const row = []
    const [content, setcontent] = useState("")
    var images_uploaded={};
    const [uploaded,setupload]=useState({})
    var field=1;
    const changehandler=(e)=>{
        var element=document.getElementById(e.target.id+"-img");
        console.log(element)
        const files = e.target.files
        var url=URL.createObjectURL(files[0]);
        // const formclass=document.getElementById(e.target.id+"img-class");
        // const form=formclass.querySelector("form");
        // const formData = new FormData(form);
        element.setAttribute("src",url);
        const name=e.target.id;
        // images_uploaded=uploaded;
        // images_uploaded[name]=formData;
        // setupload(images_uploaded)
        // console.log(images_uploaded)
    }
    const Input = styled('input')({
        display: 'none',
      });
    
    const submit=()=>{
        console.log(uploaded)
        const form = document.querySelector("form");
        const formData = new FormData(form);
        axios.post("http://127.0.0.1:5000/formsubmit",formData, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
              'Content-Type':"multipart/form-data"
            },formfields
          }).then(response=>{
              console.log(response);
          })
    }
      
    useEffect(() => {
        images_uploaded=uploaded;
        for (var i = 0; i < formfields.length; i++) {
            var file_num="file"+field;
            field+=1;
            images_uploaded[file_num]=""
            row.push(
                <div className="field">
                    <div className="img-card" id ={file_num+"img-class"}>
                        <img src={require('../uploaded_images/temp/' + formfields[i])} style={{ width: "250px", height: "180px" }} id={file_num+"-img"}/>
                        <label>
                        <Input accept="image/*"  multiple type="file" id={file_num} name={formfields[i]} onChange={(e)=>{changehandler(e)}} />
                        <Button variant="contained" type="file" style={{width:"250px", margin:"10px"}} component="span">Upload</Button> 
                        </label>
                    </div>
                </div>
            )
        }
        setupload(images_uploaded)
        setcontent(row)
    }, [])

    return (
        <div className="formviewer">
            <Navbar />
            <div className="formdisplay">
                <div className="heading">
                    <h3>Form Title</h3>
                    <p style={{ padding: "20px", "color": "white" }}>Form Description : Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae suscipit quibusdam soluta. Repellendus nemo quod facilis voluptates harum architecto, ita</p>
                </div>
                <div className="content">
                    <form>
                    <ul style={{ listStyle: "none" ,padding:"0px"}}>

                        <li style={{ background: "white" }}>
                            <p>Upload Images similar to the below image</p>
                            <div className="imagelist">
                                {content}
                            </div>
                        </li>
                    </ul>
                    </form>
                </div>
                <div className="submit-but">
                <Button variant="contained"  style={{width:"50%",margin:"auto auto"}} onClick={()=>{submit()}}>Submit</Button> 

                </div>
            </div>
            {/* {content} */}
        </div>
    )

}

export default FormViewer;
