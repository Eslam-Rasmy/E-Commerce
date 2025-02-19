import React from 'react';
import { Helmet } from 'react-helmet';
import imageEror from "../../assets/error.svg"
 
const NotFound = () => {
    return (
       <>
       <Helmet>
        <title>Erorrr</title>
       </Helmet>
       
       <div>
        <img src={imageEror} alt="" />
       </div>
       </>
    );
}

export default NotFound;