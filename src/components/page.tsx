import React, { useEffect, useState } from 'react'
import '../styles/page.css'
import Clouds from '../assets/clouds.png'
import Haze from '../assets/haze.png'
import Rain from '../assets/rain.png'
import Snow from '../assets/snow.png'
import Sun from '../assets/sun.png'
import Thunder from '../assets/thunder.png'
import Drizzle from '../assets/drizzle.png'

interface Props{
  desc:any
}

function page({desc}:Props) {

  const [img,setImg]=useState<string>('');
  useEffect(()=>{
    console.log("desc.label -- ", desc.label);
    switch(desc.label){
      case "Clear" : setImg(Sun); break;
      case 'Haze' : setImg(Haze); break;
      case 'Rain' : setImg(Rain); break;
      case 'Snow' : setImg(Snow); break;
      case 'Clouds' : setImg(Clouds); break;
      case 'Thunder' : setImg(Thunder); break;
      case 'Drizzle' : setImg(Drizzle);
    }
  },[desc])

  const [unit,setUnit]=useState('K');
  const [temp,setTemp]=useState(false);
  const toggle =()=>{
    setTemp(!temp);
    if(!temp){
      setUnit('F');
      desc.temp = ((desc.temp - 273.15)*(9/5)+32).toFixed(3);
      desc.temp_max = ((desc.temp_max - 273.15)*(9/5)+32).toFixed(3);
      desc.temp_min = ((desc.temp_min - 273.15)*(9/5)+32).toFixed(3);
    }
    else{
      setUnit('K');
      desc.temp = ((desc.temp-32)*(5/9)+273.15).toFixed(3);
      desc.temp_max = ((desc.temp_max-32)*(5/9)+273.15).toFixed(3);
      desc.temp_min = ((desc.temp_min-32)*(5/9)+273.15).toFixed(3);
    }
  }

  return (
    <>
      <div className="container">

        <div className="image">
            <img src={img} alt="image"/>
        </div>

        <div className="temp">
            {desc.city_name} : {desc.temp} {unit}
        </div>

        <div className="details">
          <div className="details1">
            <div className="main">
              {desc.label}
            </div>
            <div className="description">
              {desc.description}
            </div>
          </div>
          <div className="details2">
            <div className="max-temp">
              Max Temperature <br></br>
              {desc.temp_max} {unit}
            </div>
            <div className="min-temp">
              Min Temperature <br></br>
              {desc.temp_min} {unit}
            </div>
            <div className="humidity">
              Humidity <br></br>
              {desc.humidity}
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <div className="form-check form-switch toggle">
        <input onClick={toggle} className="form-check-input toggling" type="checkbox" 
        role="switch" id="flexSwitchCheckChecked"/> See temprature in Farhenite
      </div>
    </>
  )
}

export default page