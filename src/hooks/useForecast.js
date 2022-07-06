import { useQuery } from "react-query";
import { XMLParser } from "fast-xml-parser";

function useForecast({ lat, long }) {
  const fetchForecast = async () => {
    const parser = new XMLParser({
      attributeNamePrefix: "",
      ignoreAttributes: false,
      ignoreNameSpace: false,
    });
    const headers = new Headers();
    headers.set("content-type", "text/xml");
    headers.set("X-Requested-With", "XMLHttpRequest");

    // const url = `http:1.0.0.1`;
    const url = `${process.env.REACT_APP_CORS_PROXY}http://metwdb-openaccess.ichec.ie/metno-wdb2ts/locationforecast?lat=${lat};long=${long}`;
    const response = await fetch(url, {
      mode: "cors",
      headers: headers,
      // credentials: true, // for testing only
      redirect: "error",
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const result = await response.text();
    const data = parser.parse(result).weatherdata;
    // const created = data.created;
    const pointData = data.product.time;
    return pointData;
  };

  const { isLoading, error, data, isFetching, isSuccess } = useQuery(
    "forecast",
    fetchForecast
  );

  return {
    data: data ?? [],
    isLoading,
    error,
    isFetching,
    isSuccess,
  };
}

export default useForecast;
