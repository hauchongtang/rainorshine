import React, { useState, useEffect } from 'react';
import { Map, Popup, TileLayer, CircleMarker, Marker } from 'react-leaflet';
import { Card, CardBody, CardTitle, CardText, Navbar, NavbarBrand } from 'reactstrap';

import { fetchData } from '../../api/index';

import './map.css';

const Maps = () => {
  const [areaData, setArea] = useState([]);
  const [infoData, setInfo] = useState([]);
  const [valid, setValid] = useState([]);
  const [current, setPosition] = useState([1.3521, 103.8198]);
  const [curr, setPos] = useState({});
  const [location, setLocation] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const positions = ([position.coords.latitude, position.coords.longitude]);
      setPosition(positions)
      setPos({ lat: position.coords.latitude, long: position.coords.longitude });
    })
    const fetchAPI = async () => {
      const fetchedData = await fetchData();
      const { area, info } = fetchedData;
      setArea(area);
      setInfo(info.forecasts);
      setValid(info.valid_period);
    }
    fetchAPI();
  }, []);

  areaData.map((item, index) => item.weather = infoData[index]);

  const degToRad = (deg) => {
    return deg * Math.PI / 180;
  }

  const pythagorasEquiRectangular = (lat1, lon1, lat2, lon2) => {
    lat1 = degToRad(lat1);
    lat2 = degToRad(lat2);
    lon1 = degToRad(lon1);
    lon2 = degToRad(lon2);
    var R = 6371;
    var x = (lon2 - lon1);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
  }

  const nearestPoint = (latitude, longitude) => {
    var minDif = 99999;
    var closest;
    for (let i = 0; i < areaData.length; ++i) {
      var dif = pythagorasEquiRectangular(latitude, longitude,
        areaData.map((item) => item.label_location.latitude)[i],
        areaData.map(item => item.label_location.longitude)[i]);
      if (dif < minDif) {
        closest = i;
        minDif = dif;
      }
    }
    return closest;
  }

  const number = nearestPoint(curr.lat, curr.long);
  const areaArr = infoData.map(item => item.area)
  const forecastArr = infoData.map(item => item.forecast)
  return (
    <>
      <h4 id='weather'>2 Hourly Forecast</h4>
      <div>
        <Card>
          <CardBody>
            <h3>{number ? areaArr[number] : null}</h3>
            <p id='timestamp'>{new Date(valid.start).toLocaleTimeString()}&nbsp;to&nbsp;{new Date(valid.end).toLocaleTimeString()}</p>
            <CardText>{number ? forecastArr[number] : 'Please allow location service'}</CardText>
          </CardBody>
        </Card>
      </div>
      <h5></h5>
      <Map center={current} zoom={12}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
          <Marker position={current}></Marker>
        }
        {
          areaData.map(item => {
            return (
              <CircleMarker
                key={item.name}
                center={[
                  item.label_location.latitude,
                  item.label_location.longitude
                ]}
                onClick={() => setLocation(item)}
                radius={12}
                color={'purple'}
              />
            )
          })
        }
        {
          location && (
            <Popup
              position={[location.label_location.latitude, location.label_location.longitude]}
              onClose={() => setLocation(false)}
            >
              <h1>{location.name}</h1>
              <p>{location.weather.forecast}</p>
            </Popup>
          )
        }
      </Map>
      <h5></h5>
      <Card>
        <CardBody>
          <h3>Features</h3>
          <p>- Quick check of the weather before heading out for outdoor activities.</p>
          <p>- If you enable location, you can see your nearest weather station.</p>
          <h3>Source</h3>
          - <a href='https://data.gov.sg/'>data.gov.sg</a>
        </CardBody>
      </Card>
    </>
  )
}

export default Maps;