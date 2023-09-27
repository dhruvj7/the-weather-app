import { useEffect, useState } from 'react'
import './App.css'
import axios, { formToJSON } from 'axios';
import Page from './components/page';

function App() {

  const API_KEY = '5197c29f8fbc6aac84589dc93c8217ad';
  const [lat,setLat]=useState<any>(null);
  const [long,setLong]=useState<any>(null);
  const [cityName,setCityName]=useState<any>();
  const [desc,setDesc]= useState<any>(null)

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    })
    // localStorage.clear();
  },[])

  useEffect(()=>{
    if(lat && long){
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`)
      .then((response)=>{
        console.log("response of use effect",response.data);
        setDesc({
          'city_name':response.data.name,
          'temp':response.data.main.feels_like,
          'temp_max':response.data.main.temp_max,
          'temp_min':response.data.main.temp_min,
          'humidity':response.data.main.humidity,
          'label': response.data.weather[0].main,
          'description' : response.data.weather[0].description
        })
        setCityName(response.data.name)
      })
      .catch()
    }
  },[lat,long])

  useEffect(()=>{
    if(desc!=null){
      localStorage.setItem(desc.city_name.toLowerCase(), JSON.stringify(desc))
      setTimeout(()=>{
        localStorage.removeItem(desc.city_name.toLowerCase())
      },60000)
    }
  },[desc])

  const fetchData = ()=>{
    if(cityName=='') {alert('enter valid name'); return}

    const storedJsonString = localStorage.getItem(cityName.toLowerCase());
    if(storedJsonString!==null){
      const storedObject = JSON.parse(storedJsonString);
      setDesc(storedObject);

      console.log('Retrieved Object:', storedObject);
    }

    else{
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`)
      .then((response:any)=>{
        if(response.data.length==0) {
          alert("Data for this place is not available")
        }
        setLat(response.data[0].lat);
        setLong(response.data[0].lon);
      })
      .catch(e => console.log(e))
    }
  }

  return (
    <>
      <div className="cover">
        <input type="text" id="search-bar" value={cityName} placeholder="Enter a location"
        onChange={(e)=>{
          setCityName(e.target.value);
        }}/>
        <button onClick={fetchData}>Search</button>
      </div>
      {desc &&
      <Page desc={desc}/>}
    </>
  )
}

export default App
