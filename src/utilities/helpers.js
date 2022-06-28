export function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
}
export function checkValues(obj) {
  return Object.entries(obj).every(([_, value]) => !!value !== false);
}

export function chunkArray(array = [], chunkSize) {
  return array.length
    ? [
        array.slice(0, chunkSize),
        ...chunkArray(array.slice(chunkSize), chunkSize),
      ]
    : [];
}

export function getDayMinMaxAverages(arr) {
  let result = {
    temperature: [],
    windDirection: [],
    windSpeed: [],
    windGust: [],
    globalRadiation: [],
    humidity: [],
    pressure: [],
    cloudiness: [],
    lowClouds: [],
    mediumClouds: [],
    highClouds: [],
    dewpointTemperature: [],
    precipitation: {
      value: [],
      minvalue: [],
      maxvalue: [],
      probability: [],
    },
    symbol: [],
  };
  arr.forEach((el) => {
    el.forEach((forecast) => {
      for (let [key, val] of Object.entries(forecast.location)) {
        switch (key) {
          case "temperature":
            result[key].push(Number(val.value));
            break;
          case "windDirection":
            result[key].push(Number(val.deg));
            break;
          case "windSpeed":
            result[key].push(Number(val.mps));
            break;
          case "windGust":
            result[key].push(Number(val.mps));
            break;
          case "globalRadiation":
            result[key].push(Number(val.value));
            break;
          case "humidity":
            result[key].push(Number(val.value));
            break;
          case "pressure":
            result[key].push(Number(val.value));
            break;
          case "cloudiness":
            result[key].push(Number(val.percent));
            break;
          case "lowClouds":
            result[key].push(Number(val.percent));
            break;
          case "mediumClouds":
            result[key].push(Number(val.percent));
            break;
          case "highClouds":
            result[key].push(Number(val.percent));
            break;
          case "dewpointTemperature":
            result[key].push(Number(val.value));
            break;
          case "precipitation":
            result[key].value.push(Number(val.value));
            result[key].minvalue.push(Number(val.value));
            result[key].maxvalue.push(Number(val.value));
            result[key].probability.push(Number(val.value));
            break;
          case "symbol":
            result[key].push(val.id);
            break;
          default:
            break;
        }
      }
    });
  });

  return result;
}

export function getMinRoundedValue(arr) {
  return Math.round(Math.min(...arr));
}

export function getMaxRoundedValue(arr) {
  return Math.round(Math.max(...arr));
}

export function getAverageRoundedValue(arr) {
  return Math.round(
    (arr.reduce((acc, val) => {
      acc += val;
      return acc;
    }, 0) /
      arr.length) *
      100
  );
}
