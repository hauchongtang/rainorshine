import React, { useState, useEffect } from 'react';
import { Map, Popup, TileLayer, CircleMarker, Marker } from 'react-leaflet';
import { Card, CardBody } from 'reactstrap';

import { fetchData, fetch24Data } from '../../api/index';

import './map.css';

const Maps = () => {
  const [areaData, setArea] = useState([]);
  const [infoData, setInfo] = useState([]);
  const [valid, setValid] = useState([]);
  const [datatwfour, set24Data] = useState([]);
  const [datatwfourtime, set24Time] = useState([]);
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
      const fetched24 = await fetch24Data();
      const { area, info } = fetchedData;
      const { regions, time } = fetched24;
      set24Data(regions);
      set24Time(time);
      setArea(area);
      setInfo(info.forecasts);
      setValid(info.valid_period);
    }
    fetchAPI();
  }, []);

  const w = datatwfour.map(item => item.west);
  const e = datatwfour.map(item => item.east);
  const n = datatwfour.map(item => item.north);
  const s = datatwfour.map(item => item.south);
  const c = datatwfour.map(item => item.central);

  const startTime = datatwfourtime.map(item => item.start);
  const endTime = datatwfourtime.map(item => item.end);
  const oneStart = new Date(startTime[0]).toLocaleTimeString();
  const oneEnd = new Date(endTime[0]).toLocaleTimeString();
  const twoStart = new Date(startTime[1]).toLocaleTimeString();
  const twoEnd = new Date(endTime[1]).toLocaleTimeString();
  const threeStart = new Date(startTime[2]).toLocaleTimeString();
  const threeEnd = new Date(endTime[2]).toLocaleTimeString();

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

  const nearestPoint = (latitude, longitude, array) => {
    var minDif = 99999;
    var closest;
    for (let i = 0; i < array.length; ++i) {
      var dif = pythagorasEquiRectangular(latitude, longitude,
        array.map((item) => item.label_location.latitude)[i],
        array.map(item => item.label_location.longitude)[i]);
      if (dif < minDif) {
        closest = i;
        minDif = dif;
      }
    }
    return closest;
  }

  const number = nearestPoint(curr.lat, curr.long, areaData);
  const areaArr = infoData.map(item => item.area)
  const forecastArr = infoData.map(item => item.forecast)
  return (
    <>
      <h4 id='weather'>2 Hourly Forecast</h4>
      <div>
        <Card>
          <CardBody>
            <h3>{areaArr[number]}</h3>
            <p id='timestamp'>{new Date(valid.start).toLocaleTimeString()}&nbsp;to&nbsp;{new Date(valid.end).toLocaleTimeString()}</p>
            <h6>{forecastArr[number]}</h6>
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
              <h4>{location.name}</h4>
              <p>{location.weather.forecast}</p>
            </Popup>
          )
        }
      </Map>
      <h5></h5>
      <h4 id='weather'>24 Hour Forecast</h4>
      <Card>
        <CardBody>
          <h3>North</h3>
          <p id='time'>{oneStart}&nbsp;to&nbsp;{oneEnd}&nbsp;:&nbsp;</p>
          <h6>{n[0]}</h6>
          <p id='time'>{twoStart}&nbsp;to&nbsp;{twoEnd}&nbsp;:&nbsp;</p>
          <h6>{n[1]}</h6>
          <p id='time'>{threeStart}&nbsp;to&nbsp;{threeEnd}&nbsp;:&nbsp;</p>
          <h6>{n[2]}</h6>
          <h3>South</h3>
          <p id='time'>{oneStart}&nbsp;to&nbsp;{oneEnd}&nbsp;:&nbsp;</p>
          <h6>{s[0]}</h6>
          <p id='time'>{twoStart}&nbsp;to&nbsp;{twoEnd}&nbsp;:&nbsp;</p>
          <h6>{s[1]}</h6>
          <p id='time'>{threeStart}&nbsp;to&nbsp;{threeEnd}&nbsp;:&nbsp;</p>
          <h6>{s[2]}</h6>
          <h3>East</h3>
          <p id='time'>{oneStart}&nbsp;to&nbsp;{oneEnd}&nbsp;:&nbsp;</p>
          <h6>{e[0]}</h6>
          <p id='time'>{twoStart}&nbsp;to&nbsp;{twoEnd}&nbsp;:&nbsp;</p>
          <h6>{e[1]}</h6>
          <p id='time'>{threeStart}&nbsp;to&nbsp;{threeEnd}&nbsp;:&nbsp;</p>
          <h6>{e[2]}</h6>
          <h3>West</h3>
          <p id='time'>{oneStart}&nbsp;to&nbsp;{oneEnd}&nbsp;:&nbsp;</p>
          <h6>{w[0]}</h6>
          <p id='time'>{twoStart}&nbsp;to&nbsp;{twoEnd}&nbsp;:&nbsp;</p>
          <h6>{w[1]}</h6>
          <p id='time'>{threeStart}&nbsp;to&nbsp;{threeEnd}&nbsp;:&nbsp;</p>
          <h6>{w[2]}</h6>
          <h3>Central</h3>
          <p id='time'>{oneStart}&nbsp;to&nbsp;{oneEnd}&nbsp;:&nbsp;</p>
          <h6>{c[0]}</h6>
          <p id='time'>{twoStart}&nbsp;to&nbsp;{twoEnd}&nbsp;:&nbsp;</p>
          <h6>{c[1]}</h6>
          <p id='time'>{threeStart}&nbsp;to&nbsp;{threeEnd}&nbsp;:&nbsp;</p>
          <h6>{c[2]}</h6>
        </CardBody>
      </Card>
      <h5></h5>
      <Card>
        <CardBody>
          <h3>Features</h3>
          <p>- Quick check of the weather before heading out for outdoor activities.</p>
          <p>- If you enable location, you can see your nearest weather station.</p>
          <h3>Source</h3>
          - <a href='https://data.gov.sg/'>data.gov.sg</a>
          <h3>Code</h3>
          - <a href='https://github.com/hauchongtang/rainorshine'>GitHub</a>
        </CardBody>
      </Card>
    </>
  )
}

export default Maps;