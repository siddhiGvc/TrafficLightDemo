import React, { useState, useEffect } from 'react';
import moment from "moment";
import './App.css';

import { Switch, FormControlLabel, FormGroup, Typography, Box } from '@mui/material';
import SwitchButton from 'bootstrap-switch-button-react';
import { useNavigate } from 'react-router-dom';

const TrafficLight = () => {
  const [activeLight1, setActiveLight1] = useState('');
  const [activeLight2, setActiveLight2] = useState('');
  const [activeLight3, setActiveLight3] = useState('');
  const [activeLight4, setActiveLight4] = useState('');
  const [ACV, setACV] = useState('');
  const [ACI, setACI] = useState('');
  const [DCV, setDCV] = useState('');
  const [DCI, setDCI] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [inverterStatus,setInverterStatus]=useState('');
  const [lightStatus,setLightStatus]=useState('');

  const navigate = useNavigate();

  const handleChange = () => {
    setIsChecked(!isChecked);
  };


  // const fetchInverterData = () => {
  //   fetch('http://gvc.co.in:8080/trafficLights/queryPowerBackup', {
  //     method: 'POST',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       Junction: 20000
  //     })
  //   })
  //   .then(response => response.json())  // Convert the response to JSON
  //   .then(data => {
  //     console.log(data);
  //     // Access properties from the data object
  //     setACV(data.ACV);
  //     setACI(data.ACI);
  //     setDCV(data.DCV);
  //     setDCI(data.DCI);
  //   })
  //   .catch(err => {
  //     console.log("Error:", err);
  //   });
  
  
  // }

  const online = a => moment().diff(moment.utc((a.lastHeartBeatTime)), 'minute') < 10;
  
  const getLightData=()=>{
    fetch('http://gvc.co.in:8080/trafficLights/getLights', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Junction: 20000
      })
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      console.log(data);
      const Data=data[data.length-1]
      // Access properties from the data object
      setActiveLight1(Data.R1);
      setActiveLight2(Data.R2);
      setActiveLight3(Data.R3);
      setActiveLight4(Data.R4);
      if(online(Data))
      {
        setLightStatus("Online");
      }
      else{
        setLightStatus("Offline");
      }
    })
    .catch(err => {
      console.log("Error:", err);
    });
    
  }

  const fetchInverterStatus = () => {
    fetch('http://gvc.co.in:8080/trafficLights/getInverterStatus', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Junction: 20000
      })
    })
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      console.log(data);
      const Data=data[data.length-1]
      setACV(Data.ACV);
      setACI(Data.ACI);
      setDCV(Data.DCV);
      setDCI(Data.DCI);
      if(online(Data))
        {
          setInverterStatus("Online");
        }
        else{
          setInverterStatus("Offline");
        }
    })
    .catch(err => {
      console.log("Error:", err);
      navigate('/login');
    });
  
  
  }


  useEffect(()=>{
    // fetchInverterData();
    fetchInverterStatus();
    setInterval(()=>{
       fetchInverterStatus()
    },5000)
    
  },[])

  useEffect(() => {
    let interval;
  
    if (!isChecked) {
      getLightData();
      interval = setInterval(() => {
        getLightData();
        // Check if isChecked has changed to true within the interval callback
        if (isChecked) {
          clearInterval(interval);
        }
      }, 5000);
    } else {
      // Clear the interval when isChecked changes to true
      clearInterval(interval);
      setActiveLight1('');
      setActiveLight2('');
      setActiveLight3('');
      setActiveLight4('');
    }
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  
  }, [isChecked]);  // Dependency array includes isChecked
  

    useEffect(() => {
      if(isChecked && activeLight1.length>0 && activeLight2.length>0 && activeLight3.length>0 && activeLight4.length>0)
      {
      fetch('http://gvc.co.in:8080/trafficLights/setLights',{
        method:'POST',
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({
          Junction:20000,
          R1:activeLight1,
          R2:activeLight2,
          R3:activeLight3,
          R4:activeLight4
        })
      })
    }
      
    }, [activeLight1,activeLight2,activeLight3,activeLight4]);

    const handleClick1=(value)=>{
      if(isChecked)
      {
       setActiveLight1(value);
       setActiveLight2('R');
       setActiveLight3('R');
       setActiveLight4('R');
      }

    }

    const handleClick2=(value)=>{
      if(isChecked)
        {
      setActiveLight2(value);
      setActiveLight1('R');
      setActiveLight3('R');
      setActiveLight4('R');
        }

   }
   const handleClick3=(value)=>{
    if(isChecked)
      {
    setActiveLight3(value);
    setActiveLight1('R');
    setActiveLight2('R');
    setActiveLight4('R');
      }

 }
 const handleClick4=(value)=>{
  if(isChecked)
    {
  setActiveLight4(value);
  setActiveLight1('R');
  setActiveLight2('R');
  setActiveLight3('R');
    }

}



  return (
    <>
    <div>
   
      <div style={{width:'100%',height:'100px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{paddingLeft:"40px",marginBottom:'10px'}}>
                    
                             <h5>Select Mode</h5>
                                   <SwitchButton
                              
                                  checked={isChecked}
                                  onChange={handleChange}
                                  onlabel="Server"
                                  offlabel="Auto"
                                  onstyle='success'
                                  offstyle='info'
                                  width={180}
                              />
                    
                  
                  </div>
                  <div style={{paddingRight:"200px"}}>
                  <h4 className='inverter-stat'>Status : <span className='inverter-value'>{lightStatus}</span></h4> 
                  </div>
       </div>

    <div style={{width:'100%',display:'flex',justifyContent:"space-around",gap:"10px"}}>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div onClick={()=>handleClick1("R")} className={`light R ${activeLight1 === 'R' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick1("A")} className={`light A ${activeLight1 === 'A' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick1("G")} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`}></div>
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`}></div>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight1 === 'G' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick1("G")} className={`light G ${activeLight1 === 'G' ? 'active' : ''}`}></div>
          </div>
       </div>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div onClick={()=>handleClick2("R")} className={`light R ${activeLight2 === 'R' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick2("A")} className={`light A ${activeLight2 === 'A' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick2("G")} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`}></div>
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`}></div>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight2 === 'G' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick2("G")} className={`light G ${activeLight2 === 'G' ? 'active' : ''}`}></div>
          </div>
       </div>
     
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div onClick={()=>handleClick3("R")} className={`light R ${activeLight3 === 'R' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick3("A")} className={`light A ${activeLight3 === 'A' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick3("G")} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}></div>
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}></div>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick3("G")} className={`light G ${activeLight3 === 'G' ? 'active' : ''}`}></div>
          </div>
       </div>
       <div style={{display:"flex"}}>
            <div className="traffic-light">
            <div onClick={()=>handleClick4("R")} className={`light R ${activeLight4 === 'R' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick4("A")} className={`light A ${activeLight4 === 'A' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick4("G")} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}></div>
     
            </div>
            <div className="traffic-light">
            <div style={{visibility:'hidden',backgroundColor:"white"}} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}></div>
            <div style={{visibility:'hidden',backgroundColor:'white'}}  className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}></div>
            <div onClick={()=>handleClick4("G")} className={`light G ${activeLight4 === 'G' ? 'active' : ''}`}></div>
          </div>
       </div>
    
    </div>
   
    <div className='inverter-container'>
      <h3 className='inverter-heading'>Inverter Status: <span className='inverter-value'>{inverterStatus}</span></h3>
      <h4 className='inverter-stat'>ACV : <span className='inverter-value'>{ACV}</span></h4>
      <h4 className='inverter-stat'>ACI : <span className='inverter-value'>{ACI}</span></h4>
      <h4 className='inverter-stat'>DCV : <span className='inverter-value'>{DCV}</span></h4>
      <h4 className='inverter-stat'>DCI : <span className='inverter-value'>{DCI}</span></h4>
    </div>
    </div>
    </>
  );
};

const App = () => {
  return (
    <div >
      <TrafficLight />
    </div>
  );
};

export default App;
