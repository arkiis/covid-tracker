import axios from "axios";

const url = "https://covid19.mathdro.id/api";

axios.get("https://jsonplaceholder.typicode.com/todos/1");

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
  } catch (error) {}
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {}
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {}
};

export const fetchTopThreeCountires = async () => {
  try {
    const states = await axios.get(`${url}/countries/US/confirmed`);

    let data = states.data;

    return [data[0], data[1], data[2]];
  } catch (error) {}
};

export const fetchPriceChange = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    let length = data.length;

    let today = data[length - 1];
    let yesterday = data[length - 2];
    const isZero = () =>
      today.recovered.total == 0 || yesterday.recovered.total == 0
        ? 0
        : Math.round(today.recovered.total / yesterday.recovered.total);
    const change = {
      confirmedChange: Math.round(
        today.confirmed.total / yesterday.confirmed.total
      ),
      recoveredChange: isZero(),
      deathsChange: Math.round(today.deaths.total / yesterday.deaths.total),
    };

    return change;
  } catch (error) {}
};

export const fetchTotalValue = async () => {
  try {
    const states = await axios.get(`${url}/countries/US/`);

    let { value } = states.data.confirmed;

    return value;
  } catch (error) {}
};

export const eChartData = async () => {
  let hash = [];
  let val;

  try {
    const countriesObj = await axios.get(`${url}/countries/`);

    let { countries } = countriesObj.data;

    for (let key of countries) {
      val = await axios.get(`${url}/countries/${key.name}`);
      let { value } = val.data.confirmed;

      hash.push({ name: key.name, value: value });
    }
  } catch (error) {}

  return hash;
};

// export const fetchTopThreeCountires = async () => {
//   let country = null;

//   async function getLocation() {
//     if (navigator.geolocation) {
//       return navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       return "Geolocation is not supported by this browser.";
//     }
//   }

//   async function showPosition(position) {
//     const googleData = await axios.get(
//       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=AIzaSyBUxxkXTfUDDaRsk41Q2sS6KPxDCY7_in0`
//     );
//     let location = googleData.data.plus_code.compound_code;
//     return location.split(" ").pop();
//   }

//   try {
//     let wow = await getLocation();

//     const states = await axios.get(`${url}/countries/${wow}/confirmed`);
//     ("states", states);
//     let data = states.data;

//     return [data[0], data[1], data[2]];
//   } catch (error) {
//     ("could not fetch top cities");
//   }
// };

// const arr = async () => {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );

//   let data = await response;
//   return data
// };

// (arr())
