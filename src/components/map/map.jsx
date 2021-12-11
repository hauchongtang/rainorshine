import * as L from 'leaflet';
import lightrainmarker from '../../assets/icons8-light-rain.gif';
import cloudymarker from '../../assets/icons8-partly-cloudy-day.gif';
import nightmarker from '../../assets/night.png';
import showersmarker from '../../assets/icons8-rainfall.gif';
import thunderstorm from '../../assets/icons8-cloud-lightning.gif';
import overcastmarker from '../../assets/icons8-clouds-50.png';
import hazemarker from '../../assets/icons8-haze.gif';
import smilemarker from '../../assets/icons8-smiling-48.png';
import windmarker from '../../assets/icons8-wind-47.png';
import React, { useState, useEffect } from 'react';
import { Map, Popup, TileLayer, Marker } from 'react-leaflet';
import { Card, CardBody, Table } from 'reactstrap';

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

  const options = {
    timeZone: "Asia/Singapore",
    hour12: true,
    hour: "numeric",
  }

  // Icons
  const lightRainIcon = new L.icon({
    iconUrl: lightrainmarker,
    iconSize: [30, 30]
  });

  const cloudyDayIcon = new L.icon({
    iconUrl: cloudymarker,
    iconSize: [30, 30]
  });

  const night = new L.icon({
    iconUrl: nightmarker,
    iconSize: [30, 30]
  })

  const showers = new L.icon({
    iconUrl: showersmarker,
    iconSize: [30, 30]
  });

  const thunderStorm = new L.icon({
    iconUrl: thunderstorm,
    iconSize: [30, 30]
  });

  const overcast = new L.icon({
    iconUrl: overcastmarker,
    iconSize: [30, 30]
  });

  const haze = new L.icon({
    iconUrl: hazemarker,
    iconSize: [30, 30]
  });

  const smilelyface = new L.icon({
    iconUrl: smilemarker,
    iconSize: [30,30]
  });

  const windy = new L.icon({
    iconUrl: windmarker,
    iconSize: [30,30]
  });

  const w = datatwfour.map(item => item.west);
  const e = datatwfour.map(item => item.east);
  const n = datatwfour.map(item => item.north);
  const s = datatwfour.map(item => item.south);
  const c = datatwfour.map(item => item.central);

  const startTime = datatwfourtime.map(item => item.start);
  const endTime = datatwfourtime.map(item => item.end);
  const oneStart = new Date(startTime[0]).toLocaleTimeString("en-US", options);
  const oneEnd = new Date(endTime[0]).toLocaleTimeString("en-US", options);
  const twoStart = new Date(startTime[1]).toLocaleTimeString("en-US", options);
  const twoEnd = new Date(endTime[1]).toLocaleTimeString("en-US", options);
  const threeStart = new Date(startTime[2]).toLocaleTimeString("en-US", options);
  const threeEnd = new Date(endTime[2]).toLocaleTimeString("en-US", options);

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

  const from = new Date(valid.start).toLocaleTimeString("en-US", options);
  const to = new Date(valid.end).toLocaleTimeString("en-US", options)

  const hours = new Date().getHours();
  const isDayTime = hours > 6 && hours < 20;

  return (
    <>
      <div id="top-card">
        <Card>
          <CardBody>
            <h5>Current Location:</h5>
            <h3>{areaArr[number]}</h3>
            <p id='timestamp'>{from}&nbsp;to&nbsp;{to}</p>
            <h6>{forecastArr[number]}</h6>
          </CardBody>
        </Card>
      </div>
      <div id="map">
      <Map center={current} zoom={12}>
        <TileLayer
          url='https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png'
          //url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" 
          style="height:20px;width:20px;"/> OneMap | Map data &copy; contributors, 
          <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
        />
        {
          <Marker position={current} icon={smilelyface}></Marker>
        }
        {
          areaData.map((item, idx) => {
            if (forecastArr[idx] === "Light Rain") {
              return (
                <Marker
                  key={item.name}
                  icon={lightRainIcon}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Cloudy" && isDayTime) {
              return (
                <Marker
                  key={item.name}
                  icon={cloudyDayIcon}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Showers" || forecast[idx] === "Heavy Rain") {
              return (
                <Marker
                  key={item.name}
                  icon={showers}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Thundery Showers") {
              return (
                <Marker
                  key={item.name}
                  icon={thunderStorm}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Overcast" ||
              forecastArr[idx] === "Fair") {
              return (
                <Marker
                  key={item.name}
                  icon={overcast}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Hazy") {
              return (
                <Marker
                  key={item.name}
                  icon={haze}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            } else if (forecastArr[idx] === "Windy") {
              return (
                 <Marker
                  key={item.name}
                  icon={windy}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />               
              );
            } else {
              return (
                <Marker
                  key={item.name}
                  icon={night}
                  position={[
                    item.label_location.latitude,
                    item.label_location.longitude
                  ]}
                  onClick={() => setLocation(item)}
                  onmouseover={() => setLocation(item)}
                  onmouseout={() => setLocation(false)}
                />
              )
            }
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
      </div>

      <div id='mid-card'>
      <Card>
        <CardBody id='card0'>
          <h4 id='weather'>24 Hour Forecast</h4>
          <Table borderless>
            <thead>
              <tr>
                <th></th>
                <th>{oneStart}&nbsp;to&nbsp;{oneEnd}</th>
                <th>{twoStart}&nbsp;to&nbsp;{twoEnd}</th>
                <th>{threeStart}&nbsp;to&nbsp;{threeEnd}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">North</th>
                <td>{n[0]}</td>
                <td>{n[1]}</td>
                <td>{n[2]}</td>
              </tr>
              <tr>
                <th scope="row">South</th>
                <td>{s[0]}</td>
                <td>{s[1]}</td>
                <td>{s[2]}</td>
              </tr>
              <tr>
                <th scope="row">East</th>
                <td>{e[0]}</td>
                <td>{e[1]}</td>
                <td>{e[2]}</td>
              </tr>
              <tr>
                <th scope="row">West</th>
                <td>{w[0]}</td>
                <td>{w[1]}</td>
                <td>{w[2]}</td>
              </tr>
              <tr>
                <th scope="row">Central</th>
                <td>{c[0]}</td>
                <td>{c[1]}</td>
                <td>{c[2]}</td>
              </tr>
            </tbody>
          </Table>
        </CardBody>
      </Card>
      </div>

      <div id='bottom-card'>
      <Card>
        <CardBody>
          <h3>Features</h3>
          <p>- Quick check of the weather before heading out for outdoor activities.</p>
          <p>- If you enable location, you will be auto directed to your nearest weather station.</p>
          <h3>Source</h3>
          - <a href='https://data.gov.sg/'>data.gov.sg</a>
          <h3>Code</h3>
          - <a href='https://github.com/hauchongtang/rainorshine'>GitHub</a>
        </CardBody>
      </Card>
      </div>
    </>
  )
}

export default Maps;
