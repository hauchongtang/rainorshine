import axios from 'axios';

export const fetchData = async () => {
  try {
    const url = 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast';
    const response = await axios.get(url);
    const modifiedData = {
      area: response.data.area_metadata,
      info: response.data.items[0]
    }
    return modifiedData;
  } catch (error) {
    console.log("2h not working");
  }
};

export const fetch24Data = async () => {
  try {
    const url = 'https://api.data.gov.sg/v1/environment/24-hour-weather-forecast';
    const response = await axios.get(url);
    const modifiedData = {
      regions: response.data.items[0].periods.map(item => item.regions),
      time: response.data.items[0].periods.map(item => item.time)
    }
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};