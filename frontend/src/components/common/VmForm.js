import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const VmForm=()=>{
    const location=useLocation();
    const fields=location.state.data;
    const row=[];
    return(
        <h1>hello</h1>
    )
    // useEffect(() => {

    //     const loadcontent=()=>{
    //         for(var i=0;i<props.length;i++){
    //             row.push()

    //         }

    //     }
    // }, [])

}

export default VmForm;