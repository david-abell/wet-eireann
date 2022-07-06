import { DateTime } from "luxon";
export function removeEmptyValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null)
  );
}
export function checkValues(obj) {
  return Object.entries(obj).every(([_, value]) => !!value !== false);
}

export function chunkArray(arr = [], chunkSize = 2) {
  return arr.length
    ? [arr.slice(0, chunkSize), ...chunkArray(arr.slice(chunkSize), chunkSize)]
    : [];
}

function groupChunksByDay(chunkedData) {
  let dayChunks = {};
  chunkedData.forEach((el) => {
    const { from } = el[1];
    const timeStamp = DateTime.fromISO(from);
    const elDay = timeStamp.toFormat("EEEE, MMMM d");
    if (dayChunks[elDay]) {
      dayChunks[elDay] = [...dayChunks[elDay], el];
    } else {
      dayChunks[elDay] = [el];
    }
  });
  return dayChunks;
}

export function groupDataByDay(arr = []) {
  if (!arr.length) return {};
  const chunkedData = chunkArray(arr);
  const groupedChunks = groupChunksByDay(chunkedData);
  return groupedChunks;
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
            if (result[key].minvalue) {
              const newValue = Number(
                (Number(val.minvalue) + Number(val.maxvalue) / 2).toFixed(2)
              );
              result[key].value.push(newValue);
              result[key].minvalue.push(Number(val.minvalue));
              result[key].maxvalue.push(Number(val.maxvalue));
            } else {
              result[key].value.push(Number(val.value));
            }
            result[key].probability.push(Number(val.probability));
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
    arr.reduce((acc, val) => {
      acc += val;
      return acc;
    }, 0) / arr.length
  );
}

export function getFrequentString(arr) {
  console.log(arr);
  let stringMap = arr.reduce((acc, el) => {
    if (acc[el]) {
      acc[el]++;
    } else {
      acc[el] = 1;
    }
    return acc;
  }, {});
  console.log(stringMap);
}
