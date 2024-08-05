import GVClogo from "../../GVC_logo.jpg";

import Sidebar from "../sidebar/sidebar";

export default function Navbar(){
    return <>
       
        <div style={{paddingLeft:"10px",paddingTop:"20px"}}>
            <div style={{width:'100%',display:"flex",justifyContent:"flex-start"}}>
                <img style={{width:'150px',height:"50px"}} src={GVClogo}></img>
            </div>
         </div>
         <Sidebar/>
    
      
    </>
}