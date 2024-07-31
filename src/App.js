import React, { useState, useEffect } from 'react';
import './App.css';

const TrafficLight = () => {
  const [activeLight1, setActiveLight1] = useState('R');
  const [activeLight2, setActiveLight2] = useState('R');
  const [activeLight3, setActiveLight3] = useState('R');
  const [activeLight4, setActiveLight4] = useState('R');

    useEffect(() => {
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
      
    }, [activeLight1,activeLight2,activeLight3,activeLight4]);

    const handleClick1=(value)=>{
       setActiveLight1(value);
       setActiveLight2('R');
       setActiveLight3('R');
       setActiveLight4('R');

    }

    const handleClick2=(value)=>{
      setActiveLight2(value);
      setActiveLight1('R');
      setActiveLight3('R');
      setActiveLight4('R');

   }
   const handleClick3=(value)=>{
    setActiveLight3(value);
    setActiveLight1('R');
    setActiveLight2('R');
    setActiveLight4('R');

 }
 const handleClick4=(value)=>{
  setActiveLight4(value);
  setActiveLight1('R');
  setActiveLight2('R');
  setActiveLight3('R');

}

  return (
    <>
    <div style={{width:'90%',display:'flex',flexWrap:'wrap',justifyContent:"space-between"}}>
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
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <TrafficLight />
    </div>
  );
};

export default App;
