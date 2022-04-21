import React, { useEffect, useState } from 'react';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Alert, Form, FormControl, Button  } from 'react-bootstrap';
import './App.css';
import Icon from './i/icon-1.svg';
import Umbrella from './i/icon-umberella.png';
import Wind from './i/icon-wind.png';
import Compass from './i/icon-compass.png';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

function App() {
  const [message, setMessage] = useState('')
  const [myclass, setClass] = useState('d-none')
  const [data, setData] = useState(null)
  const [search, setSearch] = useState("Lahore")
  const [winds, setWinds] = useState("")
  const [speeds, setSpeeds] = useState("")
  const [lastUpdated, setLastUpdated] = useState(null)
  const [day, setDay] = useState('')
  const [date, setDate] = useState('')

  useEffect( () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
      .then(async response => {
        const data = await response.json();
        console.log(data);
        if(data.cod != "404"){
          findDirection(data.wind.deg);
          findSpeed(data.wind.speed);
          setData(data);
          updateLast(data.dt);
          updateDay(data.dt);
          updateDate(data.dt);
          setInterval(updateLast(data.dt), 5000);
        }
        else{
          showError(data.message);
        }
      })
  },[search])

  const showError = (e) => {
    setClass(``);
    setMessage(e);
    setTimeout(function(){
      setClass(`d-none`);
    }, 4000);
  }

  const updateLast = (e) => {
    var sec = moment.unix(e);
    setLastUpdated(sec.fromNow());
  }

  const updateDay = (e) => {
    var day = moment.unix(e).weekday();
    setDay(moment().isoWeekday(day)._locale._weekdays[day])
  }

  const updateDate = (e) => {
    var day = moment.unix(e).day();
    var dateNumber = moment.unix(e).month();
    var date = moment().isoWeekday(dateNumber)._locale._months[dateNumber];
    setDate(day+" "+date);
  }

  const findSpeed = (e) => {
    let windSpeed = e / 1000;
    setSpeeds(windSpeed.toFixed(2));
  }

  const findDirection = (e) => {
    let degrees = e;
    let directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'];
    degrees = degrees * 8 / 360;
    degrees = Math.round(degrees, 0);
    degrees = (degrees + 8) % 8;
    setWinds(directions[degrees]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target.srch.value);
  }
  
  return (
    <>
      <Header/>
      <div className='banner'>
        <Container>
        <Form className="find-location" onSubmit={handleSubmit}>
            <FormControl type="search" name="srch" placeholder="Find your location..." className="searchInput"/>
            <FormControl type="submit" className="searchBtn w-auto text-white btn btn-primary" />
        </Form>
        </Container>
      </div>
      <Alert variant='danger' className={`fixed-top text-center w-50 mx-auto top10 text-uppercase ${myclass}`}>
         {message}
      </Alert>
      {
        !data ? (
          <p>Loading...</p>
        ) : (
          <div className='forecastSection'>
            <Container className='forecast-container overflow-auto'>
              <div className='d-flex'>
                <div className='forecast today forecast-Monday d-flex flex-column flex-fill'>
                  <div className='forecast-header d-flex'>
                    <div className='day'>{day}</div>
                    <div className='date'>{date}</div>
                  </div>
                  <div className="forecast-content">
                    <div className="location d-flex align-items-center">{data.name} <span className='ms-auto font-14 me-0'><b>Last Updated:</b> {lastUpdated} </span></div>
                    <div className="degree">
                      <div className="num">{data.main.temp.toFixed(1)}<sup>o</sup>C</div>
                      <div className="forecast-icon">
                        <img src={Icon} alt="" width="90"/>
                      </div>	
                    </div>
                    <span><img src={Umbrella} alt=""/>{data.main.humidity}%</span>
                    <span><img src={Wind} alt=""/>{speeds} km/h</span>
                    <span><img src={Compass} alt=""/>{winds}</span>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        )
      }
      
    </>
  );
}

export default App;
